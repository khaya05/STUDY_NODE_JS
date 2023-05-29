const express = require('express');
const {
  getAllReviews,
  createReview
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(protect, restrictTo('user'), getAllReviews)
  .post(protect, restrictTo('user'), createReview);

module.exports = router;
