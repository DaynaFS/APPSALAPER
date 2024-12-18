const express = require('express');
const { getEarthquakeHistory,  saveEarthquakeData } = require('../controllers/quakeController');
const router = express.Router();

// GET /earthquakes
router.get('/', getEarthquakeHistory);
router.post('/sync', saveEarthquakeData);

module.exports = router;
