const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log('AUTH DEBUG: Header:', authHeader);

        const token = authHeader?.replace('Bearer ', '');
        if (!token) {
            console.log('AUTH ERROR: No token provided');
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('AUTH DEBUG: Decoded payload:', decoded);

        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            console.log('AUTH ERROR: User not found for ID:', decoded.id);
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        console.error('AUTH CATCH ERROR:', e.message);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).send({ error: 'Access denied. Admin only.' });
    }
    next();
};

module.exports = { auth, adminOnly };
