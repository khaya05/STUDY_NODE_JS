const Tour = require('../models/tourModel');
const asyncWrapper = require('../utils/catchAsync');

exports.getOverview = asyncWrapper(async (req, res) => {
  // 1) get tour data from collection
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The forest hiker'
  });
};
