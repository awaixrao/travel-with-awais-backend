const express = require('express');
const router = express.Router();
const {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingById,
    deleteBookingById,
    updateBookingPaymentStatus
} = require('../controllers/booking.controller');
const verifyToken = require('../middleware/Auth.middleware');

// Route to create a new booking
router.post('/create', verifyToken, createBooking);

// Route to get all bookings (admin route, you might want to restrict this)
router.get('/all', verifyToken, getAllBookings);

// Route to get a specific booking by ID
router.get('/:id', verifyToken, getBookingById);

// Route to update a booking by ID
router.put('/:id', verifyToken, updateBookingById);

// Route to delete a booking by ID
router.delete('/:id', verifyToken, deleteBookingById);

// Route to update payment status
router.put('/:id/payment-status', verifyToken, updateBookingPaymentStatus);

module.exports = router;
