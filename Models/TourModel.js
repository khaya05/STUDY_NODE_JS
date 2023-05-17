/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'A tour must have a name'],
  },

  duration: {
    type: Number,
    required: [true, 'A tour must have duration'],
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have group size'],
  },

  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty'],
  },

  ratingAverage: {
    type: Number,
    default: 4.5,
  },

  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    required: [true, 'a tour must have a price'],
    type: Number,
  },

  priceDiscount: Number,

  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },

  description: {
    type: String,
    trim: true,
  },

  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },

  images: [String],

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
