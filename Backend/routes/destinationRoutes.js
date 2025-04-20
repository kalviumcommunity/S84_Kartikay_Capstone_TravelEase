const express = require('express');
const { getDestinations, addDestination } = require('../controllers/destinationController.js');

const router = express.Router();

router.get('/', getDestinations);
router.post('/add', addDestination);

module.exports = router;
