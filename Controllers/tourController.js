const Tour = require('../Models/TourModel');

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tours,
  //   },
  // });
};

exports.getTour = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      // tour,
    },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      tour: 'updated',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: null,
  });
};
