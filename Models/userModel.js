/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [20, 'Name cannot exceed 20 characters'],
  },

  email: {
    type: String,
    require: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },

  photo: String,

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //this ony works on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not Match',
    },
  },
});

userSchema.pre('save', async function (next) {
  //only run if passwod is modified
  if (!this.isModified('password')) return next();

  // hash password
  this.password = await bcrypt.hash(this.password, 12);
  // delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

// instance medthod, available on all User model
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // built-in function to compare password, to hashed password
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
