const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protect, restrictTo('user'), getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router
  .route('./id')
  .delete(deleteReview)
  .patch(updateReview);

module.exports = router;
