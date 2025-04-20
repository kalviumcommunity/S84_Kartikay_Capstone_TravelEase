const Trip = require('../models/Trip.js');
const { fetchHotelDataFromAPI } = require('../services/apiService.js');

 const createTrip = async (req, res) => {
    const { userId, destination, startDate, endDate, activities, hotelName } = req.body;

    try {
        let hotelData = await fetchHotelDataFromAPI(destination);
        const selectedHotel = hotelData.find(hotel => hotel.name === hotelName) || {};

        const totalBudget = activities.reduce((acc, activity) => acc + (activity.cost || 0), 0) + (selectedHotel.price || 0);

        const newTrip = await Trip.create({
            userId,
            destination,
            startDate,
            endDate,
            activities,
            hotel: selectedHotel,
            totalBudget
        });

        res.status(201).json(newTrip);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create trip' });
    }
};

 const getTrips = async (req, res) => {
    const { userId } = req.params;

    try {
        const trips = await Trip.find({ userId });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trips' });
    }
};

const deleteTrip = async (req, res) => {
    const { tripId } = req.params;

    try {
        await Trip.findByIdAndDelete(tripId);
        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete trip' });
    }
};

module.exports = {
createTrip,getTrips,deleteTrip
};
