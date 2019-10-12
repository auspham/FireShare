const router = require('express').Router();

// @route GET /storage/{user}/{file}
// @desc Download the file - everyone has the link can download.
router.get('/:user/:file', (req, res) => {
    const file = `${__basedir}/storage/${req.params.user}/${req.params.file}`;
    res.download(file);
});

module.exports = router;