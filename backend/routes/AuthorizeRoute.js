const router = require('express').Router();
const User = require('../models/User');

router.post('/register', (req,res) => {
    res.send('Test');
})

module.exports = router;