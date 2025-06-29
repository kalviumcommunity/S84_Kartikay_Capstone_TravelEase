import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaMicrophone, FaSearch, FaMicrophoneSlash, FaMapMarkerAlt, FaStar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/Home.css';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/apiService';
import { DESTINATIONS } from './DestinationsList';

const Home = () => {
    const navigate = useNavigate();
    const { cityName } = useParams();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [destinationOfDay, setDestinationOfDay] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [sliderPositions, setSliderPositions] = useState({
        beaches: 0,
        mountains: 0,
        cities: 0
    });
    const recognitionRef = useRef(null);
    const { user, isLoggedIn } = useAuth();

    // Hero section places
    const heroPlaces = [
        {
            id: 1,
            title: 'Bali, Indonesia',
            description: 'Discover paradise on earth with pristine beaches and rich culture',
            image: 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg'
        },
        {
            id: 2,
            title: 'Swiss Alps',
            description: 'Experience the majestic beauty of snow-capped mountains',
            image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
        },
        {
            id: 3,
            title: 'Tokyo, Japan',
            description: 'Immerse yourself in the perfect blend of tradition and innovation',
            image: 'https://images.pexels.com/photos/1549326/pexels-photo-1549326.jpeg'
        },
        {
            id: 4,
            title: 'Dubai, UAE',
            description: 'Explore the city of architectural wonders and luxury',
            image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg'
        },
        {
            id: 5,
            title: 'Amazon Rainforest',
            description: 'Journey through the world\'s largest tropical rainforest',
            image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg'
        }
    ];

    // Top destinations data
    const topDestinations = {
        beaches: [
            {
                id: 1,
                name: 'Maldives',
                image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
                rating: 4.9,
                description: 'Crystal clear waters and overwater bungalows'
            },
            {
                id: 2,
                name: 'Bora Bora',
                image: 'https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg',
                rating: 4.8,
                description: 'Turquoise lagoon and luxury resorts'
            },
            {
                id: 3,
                name: 'Seychelles',
                image: 'https://images.pexels.com/photos/3601427/pexels-photo-3601427.jpeg',
                rating: 4.9,
                description: 'Pristine beaches and granite boulders'
            },
            {
                id: 4,
                name: 'Bali',
                image: 'https://images.pexels.com/photos/3601428/pexels-photo-3601428.jpeg',
                rating: 4.7,
                description: 'Tropical paradise with cultural heritage'
            },
            {
                id: 5,
                name: 'Maui',
                image: 'https://images.pexels.com/photos/3601429/pexels-photo-3601429.jpeg',
                rating: 4.8,
                description: 'Volcanic beaches and whale watching'
            },
            {
                id: 6,
                name: 'Phuket',
                image: 'https://images.pexels.com/photos/3601430/pexels-photo-3601430.jpeg',
                rating: 4.6,
                description: 'Thai beaches and vibrant nightlife'
            },
            {
                id: 7,
                name: 'Santorini',
                image: 'https://images.pexels.com/photos/3601431/pexels-photo-3601431.jpeg',
                rating: 4.8,
                description: 'Volcanic beaches and stunning sunsets'
            },
            {
                id: 8,
                name: 'Gold Coast',
                image: 'https://images.pexels.com/photos/3601432/pexels-photo-3601432.jpeg',
                rating: 4.7,
                description: 'Surfing paradise and coastal lifestyle'
            },
            {
                id: 9,
                name: 'Cancun',
                image: 'https://images.pexels.com/photos/3601433/pexels-photo-3601433.jpeg',
                rating: 4.6,
                description: 'Caribbean beaches and Mayan ruins'
            },
            {
                id: 10,
                name: 'Mauritius',
                image: 'https://images.pexels.com/photos/3601434/pexels-photo-3601434.jpeg',
                rating: 4.8,
                description: 'Indian Ocean paradise and coral reefs'
            }
        ],
        mountains: [
            {
                id: 1,
                name: 'Swiss Alps',
                image: 'https://images.pexels.com/photos/3601435/pexels-photo-3601435.jpeg',
                rating: 4.9,
                description: 'Majestic peaks and alpine villages'
            },
            {
                id: 2,
                name: 'Banff',
                image: 'https://images.pexels.com/photos/3601436/pexels-photo-3601436.jpeg',
                rating: 4.8,
                description: 'Canadian Rockies and turquoise lakes'
            },
            {
                id: 3,
                name: 'Patagonia',
                image: 'https://images.pexels.com/photos/3601437/pexels-photo-3601437.jpeg',
                rating: 4.9,
                description: 'Dramatic landscapes and glaciers'
            },
            {
                id: 4,
                name: 'Himalayas',
                image: 'https://images.pexels.com/photos/3601438/pexels-photo-3601438.jpeg',
                rating: 4.8,
                description: 'World\'s highest peaks and monasteries'
            },
            {
                id: 5,
                name: 'Rocky Mountains',
                image: 'https://images.pexels.com/photos/3601439/pexels-photo-3601439.jpeg',
                rating: 4.7,
                description: 'American wilderness and wildlife'
            },
            {
                id: 6,
                name: 'Dolomites',
                image: 'https://images.pexels.com/photos/3601440/pexels-photo-3601440.jpeg',
                rating: 4.8,
                description: 'Italian Alps and hiking trails'
            },
            {
                id: 7,
                name: 'Mount Fuji',
                image: 'https://images.pexels.com/photos/3601441/pexels-photo-3601441.jpeg',
                rating: 4.7,
                description: 'Japan\'s iconic volcano and lakes'
            },
            {
                id: 8,
                name: 'Andes',
                image: 'https://images.pexels.com/photos/3601442/pexels-photo-3601442.jpeg',
                rating: 4.8,
                description: 'South American peaks and culture'
            },
            {
                id: 9,
                name: 'Atlas Mountains',
                image: 'https://images.pexels.com/photos/3601443/pexels-photo-3601443.jpeg',
                rating: 4.6,
                description: 'Moroccan ranges and Berber villages'
            },
            {
                id: 10,
                name: 'Alps',
                image: 'https://images.pexels.com/photos/3601444/pexels-photo-3601444.jpeg',
                rating: 4.9,
                description: 'European peaks and ski resorts'
            }
        ],
        cities: [
            {
                id: 1,
                name: 'Paris',
                image: 'https://images.pexels.com/photos/3601445/pexels-photo-3601445.jpeg',
                rating: 4.9,
                description: 'City of Light and romance'
            },
            {
                id: 2,
                name: 'Tokyo',
                image: 'https://images.pexels.com/photos/3601446/pexels-photo-3601446.jpeg',
                rating: 4.8,
                description: 'Modern metropolis and tradition'
            },
            {
                id: 3,
                name: 'New York',
                image: 'https://images.pexels.com/photos/3601447/pexels-photo-3601447.jpeg',
                rating: 4.8,
                description: 'The city that never sleeps'
            },
            {
                id: 4,
                name: 'Rome',
                image: 'https://images.pexels.com/photos/3601448/pexels-photo-3601448.jpeg',
                rating: 4.9,
                description: 'Eternal City and ancient history'
            },
            {
                id: 5,
                name: 'Barcelona',
                image: 'https://images.pexels.com/photos/3601449/pexels-photo-3601449.jpeg',
                rating: 4.7,
                description: 'Gaudi\'s architecture and culture'
            },
            {
                id: 6,
                name: 'Dubai',
                image: 'https://images.pexels.com/photos/3601450/pexels-photo-3601450.jpeg',
                rating: 4.6,
                description: 'Modern marvels and luxury'
            },
            {
                id: 7,
                name: 'Singapore',
                image: 'https://images.pexels.com/photos/3601451/pexels-photo-3601451.jpeg',
                rating: 4.8,
                description: 'Garden city and innovation'
            },
            {
                id: 8,
                name: 'Amsterdam',
                image: 'https://images.pexels.com/photos/3601452/pexels-photo-3601452.jpeg',
                rating: 4.7,
                description: 'Canals and cultural heritage'
            },
            {
                id: 9,
                name: 'Istanbul',
                image: 'https://images.pexels.com/photos/3601453/pexels-photo-3601453.jpeg',
                rating: 4.8,
                description: 'Where East meets West'
            },
            {
                id: 10,
                name: 'Hong Kong',
                image: 'https://images.pexels.com/photos/3601454/pexels-photo-3601454.jpeg',
                rating: 4.7,
                description: 'Skyline and street food'
            }
        ]
    };

    // Destination of the day data
    const destinationsOfDay = [
        {
            id: 1,
            name: 'Kyoto, Japan',
            image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
            description: 'Discover the ancient capital of Japan, where traditional temples and gardens meet modern culture. Experience the beauty of cherry blossoms, historic shrines, and authentic tea ceremonies.',
            rating: 4.9,
            highlights: ['Historic Temples', 'Traditional Gardens', 'Cherry Blossoms', 'Tea Ceremonies']
        },
        {
            id: 2,
            name: 'Santorini, Greece',
            image: 'https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg',
            description: 'Experience the magic of white-washed buildings, stunning sunsets, and crystal-clear waters. This volcanic island offers breathtaking views and unforgettable Mediterranean charm.',
            rating: 4.8,
            highlights: ['Sunset Views', 'White Architecture', 'Volcanic Beaches', 'Wine Tasting']
        },
        {
            id: 3,
            name: 'Bali, Indonesia',
            image: 'https://images.pexels.com/photos/3601427/pexels-photo-3601427.jpeg',
            description: 'Immerse yourself in the island of the gods, where lush landscapes, vibrant culture, and pristine beaches create the perfect tropical paradise.',
            rating: 4.9,
            highlights: ['Sacred Temples', 'Rice Terraces', 'Beach Life', 'Cultural Heritage']
        },
        {
            id: 4,
            name: 'Paris, France',
            image: 'https://images.pexels.com/photos/3601428/pexels-photo-3601428.jpeg',
            description: 'The City of Light beckons with its iconic landmarks, world-class museums, and charming cafés. Experience the romance of the Eiffel Tower and the artistic soul of Montmartre.',
            rating: 4.8,
            highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame', 'Café Culture']
        },
        {
            id: 5,
            name: 'New York City, USA',
            image: 'https://images.pexels.com/photos/3601429/pexels-photo-3601429.jpeg',
            description: 'The city that never sleeps offers endless entertainment, from Broadway shows to world-class dining. Experience the energy of Times Square and the tranquility of Central Park.',
            rating: 4.7,
            highlights: ['Times Square', 'Central Park', 'Broadway', 'Empire State']
        },
        {
            id: 6,
            name: 'Venice, Italy',
            image: 'https://images.pexels.com/photos/3601430/pexels-photo-3601430.jpeg',
            description: 'Float through the romantic canals of this timeless city. Discover hidden piazzas, historic palaces, and the magic of Venetian architecture.',
            rating: 4.8,
            highlights: ['Gondola Rides', 'St. Mark\'s Basilica', 'Murano Glass', 'Carnival']
        },
        {
            id: 7,
            name: 'Cape Town, South Africa',
            image: 'https://images.pexels.com/photos/3601431/pexels-photo-3601431.jpeg',
            description: 'Where the mountains meet the sea, this vibrant city offers stunning landscapes, rich history, and diverse culture.',
            rating: 4.7,
            highlights: ['Table Mountain', 'Robben Island', 'Wine Regions', 'Penguin Beach']
        },
        {
            id: 8,
            name: 'Dubai, UAE',
            image: 'https://images.pexels.com/photos/3601432/pexels-photo-3601432.jpeg',
            description: 'A city of superlatives, where modern architecture meets traditional culture. Experience luxury shopping, desert adventures, and world-class dining.',
            rating: 4.6,
            highlights: ['Burj Khalifa', 'Desert Safari', 'Shopping Malls', 'Palm Islands']
        },
        {
            id: 9,
            name: 'Sydney, Australia',
            image: 'https://images.pexels.com/photos/3601433/pexels-photo-3601433.jpeg',
            description: 'Australia\'s largest city combines urban sophistication with natural beauty. Enjoy the iconic Opera House and beautiful harbor views.',
            rating: 4.7,
            highlights: ['Opera House', 'Harbor Bridge', 'Bondi Beach', 'Blue Mountains']
        },
        {
            id: 10,
            name: 'Rio de Janeiro, Brazil',
            image: 'https://images.pexels.com/photos/3601434/pexels-photo-3601434.jpeg',
            description: 'Vibrant beaches, samba rhythms, and the iconic Christ the Redeemer statue make this city a celebration of life.',
            rating: 4.6,
            highlights: ['Christ the Redeemer', 'Copacabana Beach', 'Carnival', 'Sugarloaf']
        },
        {
            id: 11,
            name: 'Barcelona, Spain',
            image: 'https://images.pexels.com/photos/3601435/pexels-photo-3601435.jpeg',
            description: 'A city of art and architecture, where Gaudi\'s masterpieces meet Mediterranean charm and vibrant street life.',
            rating: 4.8,
            highlights: ['Sagrada Familia', 'Park Güell', 'La Rambla', 'Gothic Quarter']
        },
        {
            id: 12,
            name: 'Amsterdam, Netherlands',
            image: 'https://images.pexels.com/photos/3601436/pexels-photo-3601436.jpeg',
            description: 'Canals, cycling, and cultural heritage define this charming city. Explore world-class museums and historic architecture.',
            rating: 4.7,
            highlights: ['Anne Frank House', 'Van Gogh Museum', 'Canal Cruises', 'Bike Culture']
        },
        {
            id: 13,
            name: 'Bangkok, Thailand',
            image: 'https://images.pexels.com/photos/3601437/pexels-photo-3601437.jpeg',
            description: 'A city of contrasts, where ancient temples meet modern skyscrapers. Experience vibrant street food and rich cultural heritage.',
            rating: 4.6,
            highlights: ['Grand Palace', 'Street Food', 'Floating Markets', 'Temples']
        },
        {
            id: 14,
            name: 'Vienna, Austria',
            image: 'https://images.pexels.com/photos/3601438/pexels-photo-3601438.jpeg',
            description: 'The city of music and imperial palaces. Experience classical concerts, coffee house culture, and architectural splendor.',
            rating: 4.8,
            highlights: ['Schönbrunn Palace', 'Opera House', 'Coffee Houses', 'Museums']
        },
        {
            id: 15,
            name: 'Singapore',
            image: 'https://images.pexels.com/photos/3601439/pexels-photo-3601439.jpeg',
            description: 'A modern city-state where innovation meets tradition. Experience the Marina Bay Sands and lush Gardens by the Bay.',
            rating: 4.7,
            highlights: ['Marina Bay Sands', 'Gardens by the Bay', 'Hawker Centers', 'Sentosa']
        },
        {
            id: 16,
            name: 'Istanbul, Turkey',
            image: 'https://images.pexels.com/photos/3601440/pexels-photo-3601440.jpeg',
            description: 'Where East meets West, this historic city offers magnificent mosques, bustling bazaars, and rich cultural heritage.',
            rating: 4.8,
            highlights: ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Bosphorus']
        },
        {
            id: 17,
            name: 'Seoul, South Korea',
            image: 'https://images.pexels.com/photos/3601441/pexels-photo-3601441.jpeg',
            description: 'A city that seamlessly blends ancient traditions with cutting-edge technology. Experience K-pop culture and historic palaces.',
            rating: 4.7,
            highlights: ['Gyeongbokgung', 'K-pop Culture', 'Street Food', 'Shopping']
        },
        {
            id: 18,
            name: 'Rome, Italy',
            image: 'https://images.pexels.com/photos/3601442/pexels-photo-3601442.jpeg',
            description: 'The Eternal City, where ancient history comes alive. Explore the Colosseum, Vatican City, and charming piazzas.',
            rating: 4.9,
            highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum']
        },
        {
            id: 19,
            name: 'Hong Kong',
            image: 'https://images.pexels.com/photos/3601443/pexels-photo-3601443.jpeg',
            description: 'A vibrant metropolis where East meets West. Experience stunning skyline views and diverse culinary scene.',
            rating: 4.7,
            highlights: ['Victoria Peak', 'Dim Sum', 'Shopping', 'Night Markets']
        },
        {
            id: 20,
            name: 'Prague, Czech Republic',
            image: 'https://images.pexels.com/photos/3601444/pexels-photo-3601444.jpeg',
            description: 'The City of a Hundred Spires offers fairytale architecture, historic squares, and rich cultural heritage.',
            rating: 4.8,
            highlights: ['Charles Bridge', 'Old Town Square', 'Prague Castle', 'Beer Culture']
        },
        {
            id: 21,
            name: 'Marrakech, Morocco',
            image: 'https://images.pexels.com/photos/3601445/pexels-photo-3601445.jpeg',
            description: 'A sensory journey through vibrant souks, historic medinas, and traditional riads.',
            rating: 4.6,
            highlights: ['Jardin Majorelle', 'Souks', 'Medina', 'Traditional Riads']
        },
        {
            id: 22,
            name: 'Hawaii, USA',
            image: 'https://images.pexels.com/photos/3601446/pexels-photo-3601446.jpeg',
            description: 'Paradise found with pristine beaches, volcanic landscapes, and rich Polynesian culture.',
            rating: 4.9,
            highlights: ['Beaches', 'Volcanoes', 'Luaus', 'Surfing']
        },
        {
            id: 23,
            name: 'Petra, Jordan',
            image: 'https://images.pexels.com/photos/3601447/pexels-photo-3601447.jpeg',
            description: 'The Rose City, an ancient wonder carved into rock. Experience the magic of this UNESCO World Heritage site.',
            rating: 4.8,
            highlights: ['The Treasury', 'Ancient Ruins', 'Desert Landscape', 'History']
        },
        {
            id: 24,
            name: 'Maldives',
            image: 'https://images.pexels.com/photos/3601448/pexels-photo-3601448.jpeg',
            description: 'A tropical paradise of overwater bungalows, crystal-clear waters, and pristine beaches.',
            rating: 4.9,
            highlights: ['Overwater Bungalows', 'Snorkeling', 'Beaches', 'Luxury Resorts']
        },
        {
            id: 25,
            name: 'Machu Picchu, Peru',
            image: 'https://images.pexels.com/photos/3601449/pexels-photo-3601449.jpeg',
            description: 'The lost city of the Incas, a marvel of ancient engineering and natural beauty.',
            rating: 4.9,
            highlights: ['Ancient Ruins', 'Mountain Views', 'Inca Trail', 'History']
        },
        {
            id: 26,
            name: 'Swiss Alps',
            image: 'https://images.pexels.com/photos/3601450/pexels-photo-3601450.jpeg',
            description: 'Majestic mountains, pristine lakes, and charming alpine villages.',
            rating: 4.8,
            highlights: ['Skiing', 'Hiking', 'Scenic Trains', 'Mountain Views']
        },
        {
            id: 27,
            name: 'Great Barrier Reef, Australia',
            image: 'https://images.pexels.com/photos/3601451/pexels-photo-3601451.jpeg',
            description: 'The world\'s largest coral reef system, a paradise for divers and nature lovers.',
            rating: 4.9,
            highlights: ['Diving', 'Snorkeling', 'Marine Life', 'Island Hopping']
        },
        {
            id: 28,
            name: 'Safari in Tanzania',
            image: 'https://images.pexels.com/photos/3601452/pexels-photo-3601452.jpeg',
            description: 'Experience the wild beauty of Africa\'s savannas and diverse wildlife.',
            rating: 4.8,
            highlights: ['Wildlife', 'Safari Tours', 'Serengeti', 'Ngorongoro Crater']
        },
        {
            id: 29,
            name: 'Northern Lights, Iceland',
            image: 'https://images.pexels.com/photos/3601453/pexels-photo-3601453.jpeg',
            description: 'Witness the magical aurora borealis in the land of fire and ice.',
            rating: 4.7,
            highlights: ['Aurora Borealis', 'Hot Springs', 'Glaciers', 'Volcanoes']
        },
        {
            id: 30,
            name: 'Angkor Wat, Cambodia',
            image: 'https://images.pexels.com/photos/3601454/pexels-photo-3601454.jpeg',
            description: 'The world\'s largest religious monument, a masterpiece of Khmer architecture.',
            rating: 4.8,
            highlights: ['Temple Complex', 'Sunrise Views', 'History', 'Culture']
        },
        {
            id: 31,
            name: 'Galapagos Islands, Ecuador',
            image: 'https://images.pexels.com/photos/3601455/pexels-photo-3601455.jpeg',
            description: 'A living laboratory of evolution, home to unique wildlife and pristine nature.',
            rating: 4.9,
            highlights: ['Wildlife', 'Snorkeling', 'Hiking', 'Nature']
        },
        {
            id: 32,
            name: 'Banff National Park, Canada',
            image: 'https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg',
            description: 'Stunning mountain landscapes, turquoise lakes, and abundant wildlife.',
            rating: 4.8,
            highlights: ['Lake Louise', 'Hiking', 'Wildlife', 'Scenic Views']
        },
        {
            id: 33,
            name: 'Victoria Falls, Zambia/Zimbabwe',
            image: 'https://images.pexels.com/photos/3601457/pexels-photo-3601457.jpeg',
            description: 'One of the world\'s largest waterfalls, a spectacular natural wonder.',
            rating: 4.7,
            highlights: ['Waterfall Views', 'Adventure Sports', 'Wildlife', 'Nature']
        },
        {
            id: 34,
            name: 'Patagonia, Argentina/Chile',
            image: 'https://images.pexels.com/photos/3601458/pexels-photo-3601458.jpeg',
            description: 'A wilderness paradise of glaciers, mountains, and pristine landscapes.',
            rating: 4.8,
            highlights: ['Glaciers', 'Hiking', 'Wildlife', 'Scenic Views']
        },
        {
            id: 35,
            name: 'Meteora, Greece',
            image: 'https://images.pexels.com/photos/3601459/pexels-photo-3601459.jpeg',
            description: 'Ancient monasteries perched on towering rock formations.',
            rating: 4.7,
            highlights: ['Monasteries', 'Hiking', 'History', 'Scenic Views']
        },
        {
            id: 36,
            name: 'Ha Long Bay, Vietnam',
            image: 'https://images.pexels.com/photos/3601460/pexels-photo-3601460.jpeg',
            description: 'A stunning seascape of limestone islands and emerald waters.',
            rating: 4.8,
            highlights: ['Cruise Tours', 'Kayaking', 'Caves', 'Island Hopping']
        }
    ];

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroPlaces.length);
        }, 30000); // 30 seconds

        return () => clearInterval(timer);
    }, []);

    // Set destination of the day
    useEffect(() => {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        setDestinationOfDay(destinationsOfDay[dayOfYear % destinationsOfDay.length]);
    }, []);

    // Speech recognition setup
    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            recognitionRef.current = new window.webkitSpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSearchQuery(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
        }
    }, []);

    // Effect to handle city parameter from URL
    useEffect(() => {
        if (cityName) {
            setSearchQuery(cityName);
            handleCitySearch(cityName);
        }
    }, [cityName]);

    useEffect(() => {
        if (isLoggedIn && user && user._id) {
            userAPI.getFavorites(user._id)
                .then(res => {
                    // No need to update favorites state as it's removed
                })
                .catch(err => {
                    console.error('Failed to fetch favorites:', err);
                });
        }
    }, [isLoggedIn, user]);

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser.');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
        setIsListening(!isListening);
    };

    const handleCitySearch = async (city) => {
        setIsSearching(true);
        try {
            // First, search for destinations with exact case
            const response = await fetch(`https://travelease-5z19.onrender.com/api/destinations?city=${city}`);
            const data = await response.json();

            if (data.length > 0) {
                setSearchResults(data);
            } else {
                // If no destinations found, try to get city details with exact case
                const cityResponse = await fetch(`https://travelease-5z19.onrender.com/api/cities/${city}`);
                const cityData = await cityResponse.json();

                if (cityData.city) {
                    setSearchResults([cityData]);
                } else {
                    setSearchResults(null);
                    alert('No destinations found for your search. Please try a different location.');
                }
            }
        } catch (error) {
            console.error('Search error:', error);
            alert('An error occurred while searching. Please try again.');
            setSearchResults(null);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/destinations/${searchQuery}`);
    };

    const handleSliderClick = (category, direction) => {
        setSliderPositions(prev => {
            const currentPosition = prev[category];
            const maxPosition = topDestinations[category].length - 4; // Show 4 items at a time
            const newPosition = direction === 'next' 
                ? Math.min(currentPosition + 1, maxPosition)
                : Math.max(currentPosition - 1, 0);
            
            return {
                ...prev,
                [category]: newPosition
            };
        });
    };

    const allHomeDestinations = Object.values(topDestinations).flat();

    return (
        <>
            <div style={{ position: 'fixed', top: 10, left: 10, zIndex: 9999 }}>
                {/* No heart icon needed as favorites state is removed */}
            </div>
            <div className="home-page">
                {/* Hero Section */}
                <section className="home-hero-section">
                    <div className="home-hero-slider">
                        {heroPlaces.map((place, index) => (
                            <div
                                key={place.id}
                                className={`home-hero-slide ${index === currentSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${place.image})` }}
                            >
                                <div className="home-hero-content">
                                    <h1>{place.title}</h1>
                                    <p>{place.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Search Bar */}
                <div className="search-section">
                    <div className="search-container">
                        <form className="search-form" onSubmit={handleSearch}>
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Search destinations..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={isSearching}
                                />
                                <button
                                    type="button"
                                    className={`mic-button ${isListening ? 'listening' : ''}`}
                                    onClick={toggleListening}
                                    disabled={isSearching}
                                >
                                    <FaMicrophone />
                                </button>
                            </div>
                            <button 
                                type="submit" 
                                className="search-button"
                                disabled={isSearching}
                            >
                                {isSearching ? 'Searching...' : <FaSearch />}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Destination of the Day */}
                {destinationOfDay && (
                    <section className="destination-of-day">
                        <div className="section-header">
                            <h2>Destination of the Day</h2>
                            <p>Discover our featured destination for today</p>
                        </div>
                        <div className="destination-of-day-card">
                            <div className="destination-of-day-image">
                                <img src={destinationOfDay.image} alt={destinationOfDay.name} />
                                <div className="destination-of-day-rating">
                                    <FaStar />
                                    <span>{destinationOfDay.rating}</span>
                                </div>
                                <div className="destination-of-day-overlay">
                                    <div className="destination-of-day-content">
                                        <h2>{destinationOfDay.name}</h2>
                                        <p className="destination-of-day-description">{destinationOfDay.description}</p>
                                        <div className="destination-of-day-highlights">
                                            {destinationOfDay.highlights.map((highlight, index) => (
                                                <span key={index} className="destination-of-day-tag">
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="destination-of-day-explore">
                                            Explore Now
                                            <FaMapMarkerAlt />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Top Destinations */}
                <section className="top-destinations">
                    <div className="section-header">
                        <h2>Top Destinations</h2>
                        <p>Discover our most popular travel destinations</p>
                    </div>

                    {Object.entries(topDestinations).map(([category, destinations]) => (
                        <div key={category} className="destination-category">
                            <div className="category-header">
                                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                            </div>
                            <div className="destination-grid">
                                <div 
                                    className="destination-slider"
                                    style={{
                                        transform: `translateX(-${sliderPositions[category] * 320}px)`
                                    }}
                                >
                                    {destinations.map(destination => (
                                        <div key={destination.id} className="destination-item">
                                            <div className="destination-item-image">
                                                <img 
                                                    src={destination.image} 
                                                    alt={destination.name}
                                                    className="destination-image"
                                                />
                                                <div className="destination-item-rating">
                                                    <FaStar />
                                                    <span>{destination.rating}</span>
                                                </div>
                                            </div>
                                            <div className="destination-item-info">
                                                <h4>{destination.name}</h4>
                                                <p>{destination.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="slider-controls">
                                    <button 
                                        className="slider-button"
                                        onClick={() => handleSliderClick(category, 'prev')}
                                        disabled={sliderPositions[category] === 0}
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    <button 
                                        className="slider-button"
                                        onClick={() => handleSliderClick(category, 'next')}
                                        disabled={sliderPositions[category] >= destinations.length - 4}
                                    >
                                        <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-main">
                            <div className="footer-left">
                                <div className="footer-status">
                                    <span className="status-indicator"></span>
                                    <span>All systems operational</span>
                                </div>
                                <div className="footer-time">
                                    <span className="time-display">{new Date().toLocaleTimeString('en-US', {
                                        timeZone: 'Asia/Kolkata',
                                        hour12: true,
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })}</span>
                                </div>
                            </div>
                            <div className="footer-center">
                                <div className="footer-links">
                                    <a href="/privacy">Privacy Policy</a>
                                    <a href="/terms">Terms of Service</a>
                                    <a href="/contact">Contact Us</a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-copyright">
                            <p>© 2024 TravelEase. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;
