const express = require('express');
const router = express.Router();

const {
  getAllBookings,
  bookCar,
  sendStripeKey,
  getAllBookingsOfUser,
} = require('../controllers/bookingControllers');
const { protect, isAdmin } = require('../Middleware/authMiddleware');

// Route to book a car (protected by authentication)
router.post('/bookcar', protect, bookCar);

// Route to get all bookings of a specific user (protected by authentication)
router.get('/getallbookings/:id', protect, getAllBookingsOfUser);

// Route to get all bookings (admin only, protected by authentication and admin check)
router.get('/getallbookings', protect, isAdmin, getAllBookings);

// Route to get the Stripe public key
router.get('/publickey', sendStripeKey);

module.exports = router;