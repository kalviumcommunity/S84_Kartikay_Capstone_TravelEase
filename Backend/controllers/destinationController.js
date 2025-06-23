const Destination = require('../models/Destination.js');
const { fetchCityDataFromAPI, fetchHotelDataFromAPI, fetchPopularAttractions, fetchPointsOfInterest, fetchCityImages, fetchCityDescription } = require('../services/apiService.js');

const getDestinations = async (req, res) => {
    const { city } = req.query;

    try {
        // If a city is specified, search for that city
        if (city) {
            let cities = await Destination.find({ name: city });

            if (!cities.length) {
                const apiCities = await fetchCityDataFromAPI(city);

                if (apiCities.length) {
                    // For each city, fetch extra details
                    const newCities = await Promise.all(apiCities.map(async (dest) => {
                        // Fetch hotels, attractions, images, description
                        const hotels = dest.iataCode ? await fetchHotelDataFromAPI(dest.iataCode) : [];
                        const geo = dest.geoCode || {};
                        const attractions = (geo.latitude && geo.longitude) ? await fetchPopularAttractions(geo.latitude, geo.longitude) : [];
                        const images = await fetchCityImages(dest.name);
                        const description = await fetchCityDescription(dest.name);
                        return {
                            name: dest.name,
                            country: dest.address.countryName,
                            description: description || 'Popular city for travelers',
                            category: 'City',
                            images,
                            hotels: hotels.map(h => ({
                                name: h.name,
                                image: h.media?.[0]?.uri || '',
                                price: h.price || 0,
                                location: h.address?.lines?.join(', ') || '',
                                amenities: h.amenities || []
                            })),
                            events: [], // You can add event fetching logic if available
                            attractions,
                            popularAttractions: attractions.map(a => a.name),
                            reviews: []
                        };
                    }));
                    await Destination.insertMany(newCities);
                    // Fetch the newly inserted cities from the DB
                    cities = await Destination.find({ name: city });
                    console.log(`City '${city}' fetched from API and added to DB.`);
                }
            }

            return res.status(200).json(cities);
        }

        // If no city is specified, return all destinations
        const allDestinations = await Destination.find({});
        res.status(200).json(allDestinations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch destination data' });
    }
};

const addDestination = async (req, res) => {
    const { name, country, description, category, popularAttractions } = req.body;
    try {
        const newDestination = await Destination.create({ name, country, description, category, popularAttractions });
        res.status(201).json(newDestination);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add destination' });
    }
};

const getDestinationByName = async (req, res) => {
    const { placename } = req.params;
    try {
        const destination = await Destination.findOne({ name: placename });
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch destination' });
    }
};

module.exports = {
    getDestinations,
    addDestination,
    getDestinationByName
};
