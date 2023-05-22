/* eslint-disable import/no-extraneous-dependencies */
const crypto = require('crypto');
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

  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },

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

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
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

// instance medthod, available on all User model, this => current document
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // built-in function to compare password, to hashed password
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // false means NOT changed;
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  console.log({resetToken}, this.passwordResetToken)
  
  this.passwordResetExpires = Date.now() + 600000; // 10 min * 60sec * 1000ms

  return resetToken
};

const User = mongoose.model('User', userSchema);

module.exports = User;
