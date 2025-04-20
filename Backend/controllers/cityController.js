const {
    fetchCityDataFromAPI,
    fetchHotelDataFromAPI,
    fetchPopularAttractions,
    fetchPointsOfInterest,
    fetchCityImages,
    fetchCityDescription
  } = require('../services/apiService');
  
  // GET /api/cities/:cityName
  const getCityDetails = async (req, res) => {
    const cityName = req.params.cityName;
  
    try {
      const cityData = await fetchCityDataFromAPI(cityName);
      if (!cityData || cityData.length === 0) {
        return res.status(404).json({ message: 'City not found' });
      }
  
      const { geoCode, iataCode } = cityData[0];
  
      const [hotels, attractions, popularAttractions , images , description] = await Promise.all([
        fetchHotelDataFromAPI(iataCode),
        fetchPointsOfInterest(geoCode.latitude, geoCode.longitude),
        fetchPopularAttractions(geoCode.latitude, geoCode.longitude),
        fetchCityImages(cityName),
        fetchCityDescription(cityName),
      ]);
      
  
      res.status(200).json({
        city: cityName,
        hotels,
        attractions,
        popularAttractions, // ✅ Included here
        images,
        description,
      });
    } catch (err) {
      console.error('Error in getCityDetails:', err);
      res.status(500).json({ message: 'Failed to retrieve city data' });
    }
  };
  
  module.exports = {
    getCityDetails,
  };
  