const router = require('express').Router();
const auth = require('../helpers/tokenVerfier');

// @route GET /user/
// @desc return the current user information
router.get('/', auth, (req,res) => {
    res.send(req.user);
})

module.exports = router;