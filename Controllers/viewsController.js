const Tour = require('../models/tourModel');
const User = require('../models/userModel');
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

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account'
  });
};

exports.updateUserData = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your Account',
    user //updated user
  });
});
