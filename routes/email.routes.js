const express = require('express');
const { sendBookingConfirmationEmail } = require('../controllers/email.controller');
const router = express.Router();

// POST route for sending email
router.post('/send-booking-email', sendBookingConfirmationEmail);

module.exports = router;
