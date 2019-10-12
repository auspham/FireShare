const router = require('express').Router();
const File = require('../models/File');

// @route GET /storage/{user}/{file}
// @desc Download the file - everyone has the link can download.
router.get('/:user/:file', async (req, res) => {
    const fileLocation = `storage/${req.params.user}/${req.params.file}`;
    try {
        const downloadFile = await File.findOne({ download: fileLocation });
        res.download(`${__basedir}/${downloadFile.download}`, `${downloadFile.name}`);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;