const express = require('express');
const tourController = require('../Controllers/tourController');
const authController = require('../Controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/popular')
  .get(tourController.aliasPopular, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
