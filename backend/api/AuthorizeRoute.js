const router = require('express').Router();
const User = require('../models/User');
const Encryption = require('bcryptjs');
const { formValidate } = require('../helpers/validator');
const Token = require('jsonwebtoken');
const SALT_LENGTH = 10;

// @route POST /register
// @desc Handle registration
router.post('/register', async (req,res) => {
    const { error } = await formValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExist = await User.findOne({ email: req.body.email });
    if(userExist) return res.status(400).send('Email already exists');

    const salt = await Encryption.genSalt(SALT_LENGTH);
    const hashPassword = await Encryption.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// @route POST /login
// @desc Authenticate the login and return JWT token
router.post('/login', async (req,res) => {
    const { error } = await formValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email doesn't exist");

    const validPassword = await Encryption.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    const token = Token.sign({_id: user._id}, process.env.SECRET);
    res.header('auth-token', token).send(token);

    console.log('Logged in');

    res.send('Logged In successfully');
})

module.exports = router;