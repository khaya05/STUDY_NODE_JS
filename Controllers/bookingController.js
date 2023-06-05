const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const asyncWrapper = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getCheckout = asyncWrapper(async (req, res, next) => {
  // 1) Get the current booked tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`]
          }
        }
      }
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`
  });

  // 3) create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});
