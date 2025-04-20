const { fetchHotelDataFromAPI, fetchCityDataFromAPI } = require('../services/apiService.js');
const Hotel = require('../models/Hotel.js');

const getHotels = async (req, res) => {
  const { location, refresh } = req.query;

  try {
    let hotels = [];

    // 1. Clear previous entries if refresh=true
    if (refresh === 'true') {
      await Hotel.deleteMany({ location });
    } else {
      hotels = await Hotel.find({ location });
    }

    // 2. If no hotels in DB, fetch from API
    if (!hotels.length) {
      const cityData = await fetchCityDataFromAPI(location); // existing function
      const cityCode = cityData[0]?.iataCode;

      if (!cityCode) {
        return res.status(404).json({ error: 'City not found in Amadeus API' });
      }

      const apiHotels = await fetchHotelDataFromAPI(cityCode); // existing function

      if (apiHotels.length) {
        const getRandomPriceInINR = (index) => {
          const base = 3000;
          return base + index * 157 + Math.floor(Math.random() * 150);
        };

        const defaultAmenities = ["Free WiFi", "Air Conditioning", "Pool", "Breakfast", "Gym", "Spa", "Restaurant", "Parking"];

        hotels = apiHotels.slice(0, 10).map((hotel, index) => ({
          name: hotel.name,
          location: hotel.address?.cityName || location,
          price: getRandomPriceInINR(index),
          amenities: hotel.amenities?.slice(0, 5) || defaultAmenities.slice(0, 5),
          image: `https://source.unsplash.com/featured/?hotel,room,${index}`
        }));

        await Hotel.insertMany(hotels);
      }
    }

    res.status(200).json(hotels);
  } catch (error) {
    console.error('[Hotels Controller] Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch hotels', details: error.message });
  }
};

const addHotel = async (req, res) => {
  const { name, location, price, amenities, image } = req.body;
  try {
    const newHotel = await Hotel.create({ name, location, price, amenities, image });
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add hotel', details: error.message });
  }
};

const deleteHotelsByCity = async (req, res) => {
    const { city } = req.params;
  
    try {
      const result = await Hotel.deleteMany({ location: city });
      res.status(200).json({ message: `Deleted hotels in ${city}`, deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete hotels by city', details: error.message });
    }
  };
  

module.exports = {
  getHotels,
  addHotel,
  deleteHotelsByCity,
};
