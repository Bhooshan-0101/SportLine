const mongoose = require('mongoose');

const customJerseySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  colors: [{ type: String }],
  size: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  preview: { type: String }, // URL or base64 image
}, { timestamps: true });

module.exports = mongoose.model('CustomJersey', customJerseySchema); 