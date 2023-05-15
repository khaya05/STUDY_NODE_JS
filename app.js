const { readFileSync, writeFile } = require('fs');
const { join } = require('path');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  readFileSync(join(__dirname, 'dev-data', 'data', 'tours-sample.json'))
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.filter((tour) => tour.id === Number(id));

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      tour: 'updated',
    },
  });
};

const deleteTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).post(updateTour).delete(deleteTour);

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
