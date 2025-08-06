const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  patientName: String,
  hospital: String,
  status: {
    type: String,
    enum: ['SCHEDULED', 'COLLECTED', 'DELAYED'],
    default: 'SCHEDULED',
  },
  scheduledTime: Date,
  collectedAt: Date,
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
  },
  delayReason: { type: String },
});

module.exports = mongoose.model('Sample', sampleSchema);
