const Sample = require('../models/Sample');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const addSample = async (req, res) => {
  try {
    const { patientName, hospital, scheduledTime, agentId } = req.body;

    if (!patientName || !hospital || !scheduledTime || !agentId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sample = new Sample({
      patientName,
      hospital,
      scheduledTime,
      agent: agentId,
    });

    await sample.save();

    res.status(201).json({ message: 'Sample added successfully', sample });
  } catch (error) {
    console.error('Error adding sample:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const markSampleCollected = async (req, res) => {
  try {
    const { sampleId } = req.params;
    const sample = await Sample.findById(sampleId);
    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    sample.status = 'COLLECTED';
    sample.collectedAt = new Date();
    await sample.save();
    res.status(200).json({ message: 'Sample marked as collected', sample });
  } catch (error) {
    console.error('Error marking sample as collected:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSamplesForAgent = async (req, res) => {
  try {
    const { agentId } = req.params;
    const samples = await Sample.find({ agent: agentId });
    res.status(200).json({ samples });
  } catch (error) {
    console.error('Error fetching samples for agent:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const reportSampleDelay = async (req, res) => {
  try {
    const { sampleId } = req.params;
    const { reason } = req.body;
    const sample = await Sample.findById(sampleId);
    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }
    sample.status = 'DELAYED';
    if (reason) sample.delayReason = reason;
    await sample.save();
    res.status(200).json({ message: 'Sample marked as delayed', sample });
  } catch (error) {
    console.error('Error reporting sample delay:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addSample,
  markSampleCollected,
  getSamplesForAgent,
  reportSampleDelay,
};
