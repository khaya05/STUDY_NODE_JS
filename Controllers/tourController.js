const { readFileSync, writeFile } = require('fs');
const { join } = require('path');

const tours = JSON.parse(
  readFileSync(join(__dirname, '..', 'dev-data', 'data', 'tours-sample.json'))
);

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
  const tour = tours.filter((tour) => tour.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newID = tours.at(-1).id + 1;
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
