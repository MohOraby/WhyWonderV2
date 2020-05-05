const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlenght: 1,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.generateAuthToken = function () {
  const User = this;
  const access = 'UserEmail';
  const token = jwt.sign({ email: (User.email), access }, process.env.JWT_SECRET).toString();
  return token
}

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return Promise.reject();
  }
  if (decoded.access === 'UserEmail') {
    return User.findOne({
      email: decoded.email
    });
  } else {
    return Promise.reject();
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = { User }