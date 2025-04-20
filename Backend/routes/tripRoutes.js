const express = require('express');
const { createTrip, getTrips } = require('../controllers/TripPlannerController.js');

const router = express.Router();

router.post('/create', createTrip);
router.get('/', getTrips);

module.exports = router;
