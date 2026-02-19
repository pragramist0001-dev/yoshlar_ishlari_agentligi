const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Only allow superadmin to create other admins
        // For initial setup, we might need to bypass this or run a script
        const user = new User({ name, email, password, role });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt: ${email}`);

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            console.log(`Login failed for: ${email}`);
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }

        console.log(`Login successful: ${email}`);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.send({ user, token });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        res.status(400).send({ message: error.message, error });
    }
};

const getMe = async (req, res) => {
    res.send(req.user);
};

module.exports = { register, login, getMe };
