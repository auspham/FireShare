const router = require('express').Router();
const auth = require('../helpers/tokenVerfier');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const User = require('../models/User');
const File = require('../models/File');
let user;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = './storage/'
        !fs.existsSync(`${dir}/${req.user._id}`) && fs.mkdirSync(`${dir}/${req.user._id}`);
        cb(null, './storage/' + req.user._id);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
});

// @route GET /user/
// @desc Return the current user files
router.get('/', auth, async (req,res) => {
    const user = req.user;

    try {
        const myFiles = await File.find({ owner: req.user._id });
        const sharedWithMe = await File.find({ shared: {$in: [req.user._id]}});

        res.status(200).send({
            myFiles: myFiles,
            sharedWithMe: sharedWithMe
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

// @route GET /user/all
// @desc Get All other users to share
router.get('/all', auth, async (req,res) => {
    try {
        const allUser = await User.find({ _id: { $ne: req.user._id }}).select("email");
        res.status(200).send(allUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// @route PATCH /user/share/{fileId}
// @desc Share file with other people.
router.patch('/share/:fileId', auth, async (req,res) => {
   const fileId = req.params.fileId;
   const shareIDs = [];
   for (const user of req.body) {
       shareIDs.push(user._id);
   }
   try {
       const file = await File.update({ _id: fileId }, { $set: {shared: shareIDs}});
       res.status(200).send(file);
   } catch (err) {
       res.status(400).send(err);
   }
});

// @route POST /user/upload
// @desc Upload files to db
router.post("/upload", auth, upload.single('file'), async (req, res, next) => {
    const { email } = await User.findOne({ _id: req.user });

    const file = new File({
        name: req.file.filename,
        owner: req.user._id,
        ownerEmail: email,
        download: req.file.path,
        size: req.file.size
   });

   try {
       const saveFile = file.save();
       res.send({ saveFile })
   } catch (err) {
       res.status(400).send(err);
   }
});

module.exports = router;