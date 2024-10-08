const mongoose = require('mongoose');
const Booking = require('../models/Booking.model');
const Tour = require('../models/Tour.model');
const stripe = require("stripe")('sk_test_51PyUtlRqf1z5C8P8fRZRtMy4TrYhvpFoaWCsdKX3aByxSMpbVV3UYnXuCksAkQBXkOBRut7LyRN225W5GRMhNMSb00uLyx2tKr');


// Utility function to validate ObjectId
const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id) && 
           (String)(new mongoose.Types.ObjectId(id)) === id;
};
// Create a new booking

const createBooking = async (req, res) => {
    try {
        const { user, tours, totalAmount } = req.body;

        // Validate user ID
        if (!isValidObjectId(user)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Validate tours data
        if (!Array.isArray(tours) || tours.length === 0) {
            return res.status(400).json({ message: 'Invalid tours data' });
        }

        // Prepare the tours data for the booking
        const readyTours = tours.map(t => {
            // Validate each tour ID
            if (!isValidObjectId(t._id)) {
                throw new Error(`Invalid tour ID: ${t._id}`);
            }
            return {
                tour: new mongoose.Types.ObjectId(t._id),
                seatsBooked: t.seatsBooked,
                pricePerSeat: t.pricePerSeat,
                totalPrice: t.seatsBooked * t.pricePerSeat
            };
        });

        // Create a new booking instance
        const newBooking = new Booking({
            user: new mongoose.Types.ObjectId(user),
            tours: readyTours,
            totalAmount,
            status: 'Pending' // Initial status before payment
        });

        // Save the new booking to the database
        await newBooking.save();

        // Send the booking ID in the response
        res.status(201).json({
            message: 'Booking created successfully',
            bookingId: newBooking._id // Return the booking ID for the payment process
        });

    } catch (error) {
        console.error('Error creating booking:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

module.exports = { createBooking };





// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate({
            path: "user",
            select: ["name", "email"]
        }).populate("tours.tour");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error: error.message });
    }
};

// Get a specific booking by ID
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id).populate({
            path: "user",
            select: ["name", "email"]
        }).populate("tours.tour");

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking', error: error.message });
    }
};

// Update a booking by ID (e.g., update status)
const updateBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, tours } = req.body;

        // Update booking fields
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { status, tours },
            { new: true }
        ).populate("tours.tour");

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({
            message: 'Booking updated successfully',
            booking: updatedBooking
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error: error.message });
    }
};

// Update payment status
const updateBookingPaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus } = req.body;

        // Update payment status of the booking
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { paymentStatus },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({
            message: 'Payment status updated successfully',
            booking: updatedBooking
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment status', error: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingById,
    deleteBookingById,
    updateBookingPaymentStatus
};
