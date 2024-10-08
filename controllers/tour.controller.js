const mongoose = require("mongoose");
const Tour = require('../models/Tour.model');

// Create a new tour
exports.createTour = async (req, res) => {

    try {
        const { photos, ...rest } = req.body;

        // If photos is not an array, make it one
        const photosArray = Array.isArray(photos) ? photos : [photos];

        const newTour = new Tour({ ...rest, photos: photosArray });

        const savedTour = await newTour.save();

        res.status(201).json(savedTour);
    } catch (error) {
        // Respond with a 400 status and error message in case of an error
        res.status(400).json({ message: error.message });
    }
};


// Get all tours
exports.getAllTours = async (req, res) => {
    try {
        const currentDate = new Date();
        const ongoingTours = await Tour.find({ startDate: { $lte: currentDate } });
        const upcomingTours = await Tour.find({ startDate: { $gt: currentDate } });

        res.status(200).json({ ongoingTours, upcomingTours });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single tour by ID
exports.getTourById = async (req, res) => {
    try {

        // Fetch the tour by ID
        const tour = await Tour.findById(req.params.id);

        // Check if the tour exists
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Return the tour
        res.status(200).json(tour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a tour by ID
exports.updateTourById = async (req, res) => {
    try {
        const { photos, ...rest } = req.body;

        // If photos is not an array, make it one
        const photosArray = Array.isArray(photos) ? photos : [photos];

        // Update the tour with the array of photos
        const updatedTour = await Tour.findByIdAndUpdate(
            req.params.id,
            { ...rest, photos: photosArray },
            { new: true, runValidators: true }
        );

        if (!updatedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.status(200).json(updatedTour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a tour by ID
exports.deleteTourById = async (req, res) => {
    try {
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        if (!deletedTour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
