const mongoose = require('mongoose');
const validator = require('validator');

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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
