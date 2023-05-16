const { readFileSync, writeFile } = require('fs');
const { join } = require('path');

const tours = JSON.parse(
  readFileSync(join(__dirname, '..', 'dev-data', 'data', 'tours-sample.json'))
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: "name or price cannot be empty"
    })
  }
  next();
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.filter((item) => item.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newID = tours.at(-1).id + 1;
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newID, ...req.body };
  tours.push(newTour);

  writeFile(
    join(__dirname, 'dev-data', 'data', 'tours-sample.json'),
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
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
