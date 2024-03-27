const mongoose = require('mongoose');

const ownerCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OwnerCompany', ownerCompanySchema);
