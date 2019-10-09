const router = require('express').Router();
const auth = require('../helpers/tokenVerfier');

router.get('/', auth, (req,res) => {
    res.send(req.user);
})

module.exports = router;