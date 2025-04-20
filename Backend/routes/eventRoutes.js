const express = require('express');
const router = express.Router();
const { getEventsByLocation, addEvent } = require('../controllers/eventController');

// GET events by location
router.get('/', getEventsByLocation);

// POST a new event
router.post('/', addEvent);

module.exports = router;
