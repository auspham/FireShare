const router = require('express').Router();
const auth = require('../helpers/tokenVerfier');
const multer = require('multer');
const fs = require('fs');
const User = require('../models/User');
const File = require('../models/File');
const crypto = require('crypto');
const validFilename = require('valid-filename');
const _ = require('lodash');
const server = require('../server');

let user;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = './storage'
        !fs.existsSync(`${dir}/${req.user._id}`) && fs.mkdirSync(`${dir}/${req.user._id}`);
        cb(null, './storage/' + req.user._id);
    },
    filename: function(req, file, cb) {
        cb(null, crypto.randomBytes(20).toString('hex'));
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
        const totalFile = [];

        const myFiles = await File.find({ owner: req.user._id });
        const sharedWithMe = await File.find({ shared: {$in: [req.user._id]}});

        for (file of myFiles) {
            totalFile.push(file._id);
        }

        for (file of sharedWithMe) {
            totalFile.push(file._id);
        }

        res.status(200).send({
            myFiles: myFiles,
            sharedWithMe: sharedWithMe,
            total: totalFile
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

// @route GET /user/info
// @desc Return the current user info
router.get('/info', auth, async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.user });

        res.status(200).send(user);
    } catch(err) {
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
   const selectedUsers = req.body;
   try {
       const file = await File.findOneAndUpdate({ _id: fileId, owner: req.user._id },
           { $set: {shared: selectedUsers}});
       if(selectedUsers.length > 0) {
           for ( user of selectedUsers ) {
               let userIsLive = connectedUser[user];
               if(userIsLive)
                   server.io.sockets.connected[userIsLive].emit('subscribe', file._id);
           }
       } else {
           server.io.sockets.in(fileId).emit('unsubscribe', file._id);
       }
       res.status(200).send(file);
   } catch (err) {
       res.status(400).send(err);
   }
});

// @route PATCH /user/unshare/{fileId}
// @desc Unshare the file for yourself.
router.patch('/unshare/:fileId', auth, async (req,res) => {
    const fileId = req.params.fileId;

    try {
        const file = await File.findOneAndUpdate({ _id: fileId, shared: {$in: req.user._id}}, {
            $pull: { shared: { $in: req.user._id }}
        });
        res.status(200).send(file);
    } catch (err) {
        res.status(400).send(err);
    }
});

// @route PATCH /user/update/{fileId}
// @desc Edit file name
router.patch('/update/:fileId', auth, async (req,res) => {
    const fileId = req.params.fileId;
    const { name } = req.body;
    if(validFilename(name)) {
        try {
            const file = await File.findOneAndUpdate({ _id: fileId, owner: req.user._id },
                { $set: {name: name, date: Date.now()}});
            server.io.sockets.in(fileId).emit('update');

            res.status(200).send(file);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(400).send();
    }
});


// @route GET /user/share/{fileId}
// @desc Get the current shared users of a file
router.get('/share/:fileId', auth, async(req, res) => {
    const fileId = req.params.fileId;
    try {
        const file = await File.findOne({ _id: fileId, owner: req.user._id });
        server.io.sockets.in(fileId).emit('update');

        res.status(200).send(file.shared);
    } catch (err) {
        res.status(400).send(err);
    }
});

// @route POST /user/upload
// @desc Upload files to db
router.post("/upload", auth, upload.single('file'), async (req, res, next) => {
    const { email } = await User.findOne({ _id: req.user });

    const file = new File({
        name: req.file.originalname,
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

// @route DELETE /user/delete/{fileId}
// @desc Delete a file
router.delete('/delete/:fileId', auth, async(req,res) => {
   const fileId = req.params.fileId;
   try{
       const removedFile = await File.findOneAndRemove({ _id: fileId, owner: req.user._id });
       fs.unlinkSync(`${__basedir}/${removedFile.download}`);
       server.io.sockets.in(fileId).emit('update');

       res.status(200).send();
   } catch (err) {
       res.status(400).send(err);
   }
});


module.exports = router;