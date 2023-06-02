const Tour = require('../models/tourModel');
const asyncWrapper = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = asyncWrapper(async (req, res, next) => {
  // 1) get tour data from collection
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = asyncWrapper(async (req, res, next) => {
  // 1. get data
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.login = asyncWrapper(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
});
