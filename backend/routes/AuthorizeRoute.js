const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;