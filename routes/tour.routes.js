const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller'); // Adjust the path as needed

// Create a new tour
router.post('/create', tourController.createTour);

// Get all tours
router.get('/all', tourController.getAllTours);

// Get a single tour by ID
router.get('/get/:id', tourController.getTourById);

// Update a tour by ID
router.put('/update/:id', tourController.updateTourById);

// Delete a tour by ID
router.delete('/delete/:id', tourController.deleteTourById);

module.exports = router;
