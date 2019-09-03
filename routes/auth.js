const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // Validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // Validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user doesnt exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email doesnt exist');

    // Checking password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Password is incorrect');

    // Everything is valid --> Create a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    // res.send('Logged In');
});

module.exports = router;
