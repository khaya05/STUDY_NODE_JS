const express = require('express');
const { getCheckout } = require('../controllers/bookingController');
const { protect } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.get('/checkout/:tourId', protect, getCheckout);

module.exports = router;
