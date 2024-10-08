const Booking = require('../models/Booking.model'); // Import your Booking model
const Payment = require('../models/Payment.modal'); // Import Payment model
const User = require("../models/User.model")
const stripe = require('stripe')("sk_test_51PyUtlRqf1z5C8P8fRZRtMy4TrYhvpFoaWCsdKX3aByxSMpbVV3UYnXuCksAkQBXkOBRut7LyRN225W5GRMhNMSb00uLyx2tKr"); // Ensure your Stripe secret key is set

// Create a new payment
const createPayment = async (req, res) => {
    try {
        const { bookingId, userId, amount } = req.body;

        // Validate bookingId
        if (!bookingId) {
            return res.status(400).json({ message: 'BookingId is required' });
        }

        // Check if the booking exists
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a payment intent using Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe uses cents
            currency: "usd",
            metadata: { bookingId, userId }
        });

        // Create a new payment and save it
        const newPayment = new Payment({
            BookingId: bookingId,
            userId,
            amount,
            status: 'pending',
            paymentIntentId: paymentIntent.id
        });

        await newPayment.save();

        // Return the client secret for frontend confirmation
        res.status(201).json({
            message: 'Payment created successfully',
            payment: newPayment,
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
};


// Get payment by ID
const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id).populate('userId');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving payment', error: error.message });
    }
};

module.exports = {
    createPayment,
    getPaymentById
};
