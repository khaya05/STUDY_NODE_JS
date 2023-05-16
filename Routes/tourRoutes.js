const express = require('express');
const tourController = require('./../Controllers/tourController');
const router = express.Router();

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .post(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
