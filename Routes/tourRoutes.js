const express = require('express');
const tourController = require('./../Controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .post(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
