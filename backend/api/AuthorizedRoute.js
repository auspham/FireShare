const router = require('express').Router();
const auth = require('../helpers/tokenVerfier');
const mongoose = require('mongoose');

// @route GET /user/
// @desc Return the current user information
router.get('/', auth, (req,res) => {
    res.send(req.user);
})

// @route POST /user/upload
// @desc Upload files to db
module.exports = router;