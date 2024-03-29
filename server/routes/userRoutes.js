// const express = require("express");
// const router = express.Router();

// const { register, login, getAllUser } = require("../controllers/userControllers");

// const { protect, isAdmin } = require('../Middleware/authMiddleware')

// router.post("/login", login);
// router.post("/register", register);

// router.get('/userlist', protect, isAdmin, getAllUser)

// module.exports = router;   
const express = require('express');
const router = express.Router();

const { register, login, getAllUser } = require('../controllers/userControllers');
const { protect, isAdmin } = require('../Middleware/authMiddleware');

// Route for user login
router.post('/login', login);

// Route for user registration
router.post('/register', register);

// Route to get the list of all users (admin only, protected by authentication and admin check)
router.get('/userlist', protect, isAdmin, getAllUser);

module.exports = router;
