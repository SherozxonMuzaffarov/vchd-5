const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    enum: ['head_master','group_master', "group_brigader", 'svarchik', 'tokar', 'defektoskopist', 'chilangar'],
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    enum: ['weekly','first', "second"],
    required: true,
  },
  section: {
    type: String,
    enum: ["g'ildirakSexi"],
    required: true,
  },
  depo: {
    type: String,
    enum: ["ВЧД-6"],
    default: "ВЧД-6",
  },
  files: [{
    name: String,
    img: String,
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);