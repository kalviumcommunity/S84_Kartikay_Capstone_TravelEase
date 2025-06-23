const express = require('express');
const { getDestinations, addDestination, getDestinationByName } = require('../controllers/destinationController.js');

const router = express.Router();

router.get('/', getDestinations);
router.post('/add', addDestination);
router.get('/:placename', getDestinationByName);

module.exports = router;
