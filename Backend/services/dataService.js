const Destination = require('../models/Destination.js');
const Hotel = require('../models/Hotel.js');
const axios = require('axios');

// Fetch Destinations (Hybrid Logic)
const getDestinationData = async (country) => {
    let destinations = await Destination.find({ country });
    if (!destinations.length) {
        const API_URL = `https://api.amadeus.com/v1/reference-data/locations?keyword=${country}&subType=CITY`;
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${process.env.AMADEUS_API_KEY}` }
        });

        destinations = response.data.data.map(dest => ({
            name: dest.name,
            country: dest.address.countryName,
            cityCode: dest.iataCode
        }));

        await Destination.insertMany(destinations); // Cache in MongoDB
    }
    return destinations;
};

// Fetch Hotels (Hybrid Logic)
const getHotelData = async (city) => {
    let hotels = await Hotel.find({ location: city });
    if (!hotels.length) {
        const API_URL = `https://api.booking.com/hotels?city=${city}`;
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${process.env.BOOKING_API_KEY}` }
        });

        hotels = response.data.hotels.map(hotel => ({
            name: hotel.name,
            location: hotel.city,
            price: hotel.price,
            amenities: hotel.amenities
        }));

        await Hotel.insertMany(hotels); // Cache in MongoDB
    }
    return hotels;
};

module.exports = { getDestinationData, getHotelData };
