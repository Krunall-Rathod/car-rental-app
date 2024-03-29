const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.user._id).select('-password');

            next();
        } catch (error) {
            res.status(401).json('Not authorized, token failed');
        }
    }

    if (!token) {
        return res.status(401).json('Not authorized, no token');
    }
};

const isAdmin = async (req, res, next) => {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.status(403).json('Only Admin Can Access');
    }
};

module.exports = { protect, isAdmin };
