const express = require('express');
const router = express.Router();
const { getCityDetails } = require('../controllers/cityController');

router.get('/:cityName', getCityDetails);

module.exports = router;
