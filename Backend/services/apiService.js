const axios = require('axios');
let accessToken = null;
let tokenExpiry = null;

// Get Amadeus OAuth token
const getAccessToken = async () => {
  if (accessToken && tokenExpiry > Date.now()) return accessToken;

  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
    return accessToken;
  } catch (error) {
    console.error('Error fetching Amadeus token:', error.response?.data || error.message);
    return null;
  }
};

// Fetch hotel data by city code
const fetchHotelDataFromAPI = async (cityCode) => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching hotels from API:', error.response?.data || error.message);
    return [];
  }
};

// ✅ Fetch city code from city name
const fetchCityDataFromAPI = async (city) => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${city}&subType=CITY`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching city data from API:', error.response?.data || error.message);
    return [];
  }
};

const fetchPointsOfInterest = async (latitude, longitude) => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await axios.get(
      `https://test.api.amadeus.com/v1/reference-data/locations/points-of-interest`,
      {
        params: {
          latitude,
          longitude,
          radius: 20 // <- Radius should be a valid integer (1–100)
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching points of interest:', error.response?.data || error.message);
    return [];
  }
};



// Helper: Get top 5 popular attractions from all points of interest
const fetchPopularAttractions = async (latitude, longitude) => {
  const allPOIs = await fetchPointsOfInterest(latitude, longitude);
  
  // Example logic: sort by rating (if exists), or use relevance
  const popular = allPOIs
    .filter(poi => poi.name && poi.category && poi.category !== 'UNKNOWN')
    .slice(0, 5) // fallback: just pick first 5 relevant ones
    .map(poi => ({
      name: poi.name,
      category: poi.category,
      tags: poi.tags || [],
    }));

  return popular;
};


const fetchCityImages = async (cityName) => {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`
    );

    if (response.data.originalimage) {
      return [response.data.originalimage.source]; // High-res
    } else if (response.data.thumbnail) {
      return [response.data.thumbnail.source]; // Fallback
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching city image from Wikipedia:', error.response?.data || error.message);
    return [];
  }
};



const fetchCityDescription = async (cityName) => {
  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`
    );

    return response.data.extract; // City summary text
  } catch (error) {
    console.error('Error fetching city description:', error.response?.data || error.message);
    return 'No description available.';
  }
};


module.exports = {
  fetchHotelDataFromAPI,
  fetchCityDataFromAPI,
  fetchPointsOfInterest,
  fetchPopularAttractions, // ✅ added here
  fetchCityImages,
  fetchCityDescription,
};
