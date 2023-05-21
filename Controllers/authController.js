// eslint-disable-next-line import/no-extraneous-dependencies
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2. check is user exists
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3. if ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1. get token, check if it exists
  const { authorization } = req.headers;
  let token = '';

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in!', 401));
  }

  // 2. validate/verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3. check if user exists

  // 4. check if user changed password after token was issued
  next();
});
