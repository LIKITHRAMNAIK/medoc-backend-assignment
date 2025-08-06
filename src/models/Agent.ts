const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('Agent', agentSchema);
