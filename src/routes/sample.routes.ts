const express = require('express');
const { addSample, markSampleCollected, getSamplesForAgent, reportSampleDelay } = require('../controllers/sample.controller');

const router = express.Router();

// POST /api/samples
router.post('/', addSample);

// PATCH /api/samples/:sampleId/collect
router.patch('/:sampleId/collect', markSampleCollected);

// PATCH /api/samples/:sampleId/delay
router.patch('/:sampleId/delay', reportSampleDelay);

// GET /api/samples/agent/:agentId
router.get('/agent/:agentId', getSamplesForAgent);

module.exports = router;
