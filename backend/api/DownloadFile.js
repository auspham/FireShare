const router = require('express').Router();
const File = require('../models/File');
const auth = require('../helpers/tokenVerfier');
const _ = require('lodash');

// @route GET /storage/{user}/{file}
// @desc Download the file - everyone has the link can download.
router.get('/:user/:file', auth, async (req, res) => {
    const fileLocation = `storage/${req.params.user}/${req.params.file}`;
    try {
        const downloadFile = await File.findOne({ download: fileLocation });
        if(_.includes(downloadFile.shared, req.user._id) || downloadFile.owner == req.user._id) {
            res.download(`${__basedir}/${downloadFile.download}`, `${downloadFile.name}`);
        } else {
            res.status(403).send("Don't have authorisation")
        }
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;