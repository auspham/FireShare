const router = require('express').Router();
const auth = require('../helpers/tokenVerfier');
const mongoose = require('mongoose');
const multer = require('multer');
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
// @desc Return the current user information
router.get('/', auth, (req,res) => {
    res.send(req.user);
})

// @route POST /user/upload
// @desc Upload files to db
router.post("/upload", upload.single('file'), (req, res, next) => {
   const file = new File({
       name: req.file.filename,
       owner: req.body.owner,
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