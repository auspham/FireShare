const router = require('express').Router();
const User = require('../models/User');
const { formValidate } = require('../helpers/validator');

router.post('/register', async (req,res) => {
    // Validation check
    const { error } = await formValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user exist
    const userExist = await User.findOne({ email: req.body.email });
    if(userExist) return res.status(400).send('Email already exists');

    // Create a new user
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