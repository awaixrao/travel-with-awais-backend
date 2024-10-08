const express = require('express');
const router = express.Router();
const { createPayment, getPaymentById } = require('../controllers/payment.controller');
const verifyToken = require('../middleware/Auth.middleware');

// Route to create a new payment
router.post('/create', verifyToken, createPayment);

// Route to get payment by ID
router.get('/:id', verifyToken, getPaymentById);

module.exports = router;
