const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  term: { type: String, required: true, trim: true },
  searchCount: { type: Number, default: 1 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Search', searchSchema);
