const express = require('express');
const { getHotels, addHotel , deleteHotelsByCity } = require('../controllers/hotelController.js');

const router = express.Router();

router.get('/', getHotels);
router.post('/add', addHotel);
router.delete('/:city', deleteHotelsByCity);

module.exports = router;
