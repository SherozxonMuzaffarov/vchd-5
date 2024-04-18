const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 250
  },
  phone_number: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', "g'ildirakSexi", "telejkaSexi"],
    required: true,
    default: 'admin'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);