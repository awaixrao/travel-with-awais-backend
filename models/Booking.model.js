const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tours: [
        {
            tour: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tour',
                required: true
            },
            seatsBooked: {
                type: Number,
                required: true,
                min: [1, 'Seats booked cannot be less than 1']
            },
            pricePerSeat: {
                type: Number,
                // required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    paymentIntentId: String,
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
