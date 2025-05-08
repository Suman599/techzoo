const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  issueNumber: { type: String, required: true },
  issueMonth: { type: String, required: true },
  magazineUrl: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const Magazine = mongoose.model('Magazine', magazineSchema);

module.exports = Magazine;
