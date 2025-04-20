const Destination = require('../models/Destination.js');
const { fetchCityDataFromAPI } = require('../services/apiService.js');

const getDestinations = async (req, res) => {
    const { city } = req.query;

    try {
        // If a city is specified, search for that city
        if (city) {
            let cities = await Destination.find({ name: city });

            if (!cities.length) {
                cities = await fetchCityDataFromAPI(city);

                if (cities.length) {
                    await Destination.insertMany(cities.map(dest => ({
                        name: dest.name,
                        country: dest.address.countryName,
                        description: 'Popular city for travelers',
                        category: 'City',
                        popularAttractions: []
                    })));
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

module.exports = {
    getDestinations,
    addDestination
};
