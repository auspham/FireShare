const router = require('express').Router();
const auth = require('../helpers/tokenVerfier');
const mongoose = require('mongoose');
const multer = require('multer');
const User = require('../models/User');
const File = require('../models/File');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
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
        const allFiles = await File.find();
        res.status(200).send(allFiles);
    } catch (err) {
        res.status(400).send(err);
    }
});

// @route POST /user/upload
// @desc Upload files to db
router.post("/upload", upload.single('file'), auth, async (req, res, next) => {
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