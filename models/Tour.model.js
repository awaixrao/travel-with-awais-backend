const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the tour schema
const tourSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlight: {
        type: String, 
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },
    
    photos: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} exceeds the limit of 4'] 
    },
    ratings: {
        type: Number, 
        default: 0
    },

    totalSeats: {
        type: Number
        },
    availableSeats: {
        type: Number
    },
    available: {
        type: Boolean,
        default: true
    },
    duration: {
        type: Number, 
        required: true
    },
    startLocation: {
        type: String, 
        required: true
    },
    locations: {
        type: [String], 
        required: true
    }
  
}, { timestamps: true });

// Function to limit the array to 4 images
function arrayLimit(val) {
    return val.length <= 4;
}

// Create the tour model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
