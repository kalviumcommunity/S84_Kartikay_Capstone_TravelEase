import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/DestinationList.css';
import heroVideo from '../assets/destination.mp4';
import { userAPI } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

// Example genres and destinations array
const GENRES = [
  'Nature & Scenic', 'Historical & Heritage', 'Urban & Modern', 'Cultural & Religious',
  'Adventure & Sports', 'Wellness & Relaxation', 'Shopping & Luxury', 'Eco & Sustainable',
  'Educational & Scientific', 'Food & Culinary'
];

const DESTINATIONS = [
  // Nature & Scenic
  {
    name: 'Swiss Alps',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/3958976/pexels-photo-3958976.jpeg',
    description: 'The Swiss Alps are renowned for their breathtaking peaks, charming alpine villages, and pristine lakes. Visitors flock here for world-class skiing in winter and hiking or mountain biking in summer, with iconic spots like Zermatt and Jungfrau.',
    country: 'Switzerland',
    bestTime: 'June–September (hiking), December–March (skiing)',
    popularFor: 'Majestic mountains, skiing, hiking, scenic train rides',
    rating: 4.9
  },
  {
    name: 'Banff National Park',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/32670484/pexels-photo-32670484.jpeg',
    description: 'Banff National Park in Alberta is famous for its stunning turquoise lakes like Lake Louise and Moraine Lake, dramatic Rocky Mountain landscapes, and abundant wildlife including bears and elk. It\'s a haven for outdoor enthusiasts year-round.',
    country: 'Canada',
    bestTime: 'June–August (summer), December–March (winter sports)',
    popularFor: 'Turquoise lakes, mountain scenery, wildlife',
    rating: 4.8
  },
  {
    name: 'Maldives',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
    description: 'The Maldives is a tropical paradise of over 1,000 coral islands, known for its crystal-clear waters, vibrant marine life, and luxurious overwater bungalows. It\'s a top destination for honeymooners and water sports lovers.',
    country: 'Maldives',
    bestTime: 'November–April (dry season)',
    popularFor: 'White-sand beaches, luxury resorts, snorkeling, diving',
    rating: 4.9
  },
  {
    name: 'Sahara Desert',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/10390494/pexels-photo-10390494.jpeg',
    description: "The Sahara is the world's largest hot desert, offering vast golden dunes, dramatic landscapes, and unique Berber culture. Popular activities include camel safaris, camping under the stars, and exploring ancient oases.",
    country: 'Morocco, Algeria, Egypt, etc.',
    bestTime: 'October–April',
    popularFor: 'Sand dunes, camel trekking, stargazing',
    rating: 4.7
  },
  {
    name: 'Reykjavik & Icelandic Nature',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/15264393/pexels-photo-15264393.jpeg',
    description: "Reykjavik is the gateway to Iceland's natural wonders, including the Golden Circle, Blue Lagoon, and countless waterfalls. The country is famed for its volcanic landscapes, geothermal pools, and the chance to see the aurora borealis.",
    country: 'Iceland',
    bestTime: 'June–August (midnight sun), September–March (Northern Lights)',
    popularFor: 'Northern Lights, geysers, waterfalls, glaciers',
    rating: 4.8
  },
  {
    name: 'Goa',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/978667/pexels-photo-978667.jpeg',
    description: "Goa is India's premier beach destination, known for its palm-fringed shores, vibrant nightlife, and blend of Indian and Portuguese cultures. Visitors enjoy water sports, seafood, and historic churches.",
    country: 'India',
    bestTime: 'November–March',
    popularFor: 'Beaches, nightlife, Portuguese heritage',
    rating: 4.6
  },
  {
    name: 'Amazon Rainforest',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/2739666/pexels-photo-2739666.jpeg',
    description: "The Amazon is the world's largest tropical rainforest, teeming with unique wildlife and plants. Guided river cruises and eco-lodges offer immersive experiences in this vital ecosystem.",
    country: 'Brazil (also Peru, Colombia, etc.)',
    bestTime: 'June–September (dry season)',
    popularFor: 'Biodiversity, river cruises, jungle lodges',
    rating: 4.8
  },
  {
    name: 'Patagonia',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/3158519/pexels-photo-3158519.jpeg',
    description: 'Patagonia is a remote region of South America known for its rugged mountains, glaciers, and windswept plains. Highlights include Torres del Paine National Park and the Perito Moreno Glacier.',
    country: 'Argentina, Chile',
    bestTime: 'November–March (summer)',
    popularFor: 'Trekking, glaciers, dramatic landscapes',
    rating: 4.9
  },
  {
    name: 'Ha Long Bay',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/58597/pexels-photo-58597.jpeg',
    description: 'Ha Long Bay is a UNESCO World Heritage Site famous for its emerald waters and thousands of limestone islands topped with rainforests. Junk boat cruises and kayaking are popular ways to explore its beauty.',
    country: 'Vietnam',
    bestTime: 'October–April',
    popularFor: 'Limestone islands, boat cruises, caves',
    rating: 4.7
  },
  {
    name: 'Yosemite National Park',
    genre: 'Nature & Scenic',
    image: 'https://images.pexels.com/photos/533881/pexels-photo-533881.jpeg',
    description: 'Yosemite is an iconic American national park, celebrated for its towering granite cliffs like El Capitan and Half Dome, spectacular waterfalls, and ancient sequoia trees. It\'s a paradise for hikers and climbers.',
    country: 'United States',
    bestTime: 'May–September',
    popularFor: 'Granite cliffs, waterfalls, giant sequoias',
    rating: 4.8
  },

  // Historical & Heritage
  {
    name: 'Cairo',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/15127306/pexels-photo-15127306.jpeg',
    description: "Cairo, Egypt's sprawling capital, is famous for its proximity to the Pyramids of Giza and the Sphinx. The city is a treasure trove of ancient history, bustling bazaars, and the mighty Nile River.",
    country: 'Egypt',
    bestTime: 'October–April',
    popularFor: 'Pyramids, Sphinx, Egyptian Museum',
    rating: 4.8
  },
  {
    name: 'Machu Picchu',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg',
    description: 'Machu Picchu is a 15th-century Inca citadel set high in the Andes Mountains in Peru, renowned for its sophisticated dry-stone walls and panoramic views.',
    country: 'Peru',
    bestTime: 'April–October',
    popularFor: 'Inca ruins, hiking, mountain views',
    rating: 4.9
  },
  {
    name: 'Venice',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/158441/venice-italy-sunset-grand-canal-158441.jpeg',
    description: 'Venice is a unique city built on water, famous for its intricate canal system, Renaissance and Gothic palaces, and vibrant art scene.',
    country: 'Italy',
    bestTime: 'April–June, September–November',
    popularFor: 'Canals, St. Mark\'s Basilica, gondola rides',
    rating: 4.7
  },
  {
    name: 'Rome',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg',
    description: 'Rome, the Eternal City, is a living museum of ancient ruins, grand piazzas, and world-class art. Highlights include the Colosseum, Roman Forum, and Vatican City.',
    country: 'Italy',
    bestTime: 'April–June, September–October',
    popularFor: 'Colosseum, Roman Forum, Vatican',
    rating: 4.9
  },
  {
    name: 'Petra',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/29887260/pexels-photo-29887260.jpeg',
    description: 'Petra is a UNESCO World Heritage Site in southern Jordan, famous for its rock-cut architecture and the iconic Treasury facade.',
    country: 'Jordan',
    bestTime: 'March–May, September–November',
    popularFor: 'Rock-cut architecture, The Treasury, hiking',
    rating: 4.8
  },
  {
    name: 'Angkor Wat',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/3217663/pexels-photo-3217663.jpeg',
    description: "Angkor Wat is the world's largest religious monument, a sprawling temple complex in Cambodia surrounded by lush jungle and intricate carvings.",
    country: 'Cambodia',
    bestTime: 'November–March',
    popularFor: 'Temple complex, sunrise views, Khmer history',
    rating: 4.8
  },
  {
    name: 'Jaipur',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/28448950/pexels-photo-28448950.jpeg',
    description: 'Jaipur, the Pink City, is known for its grand forts, palaces, and vibrant bazaars. Highlights include Amber Fort, City Palace, and Hawa Mahal.',
    country: 'India',
    bestTime: 'October–March',
    popularFor: 'Forts, palaces, vibrant markets',
    rating: 4.7
  },
  {
    name: 'Versailles',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/13692199/pexels-photo-13692199.jpeg',
    description: 'The Palace of Versailles is a symbol of royal opulence, with its magnificent gardens, Hall of Mirrors, and rich history as the seat of French kings.',
    country: 'France',
    bestTime: 'April–October',
    popularFor: 'Palace, gardens, Hall of Mirrors',
    rating: 4.7
  },
  {
    name: 'Hampi',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/29777778/pexels-photo-29777778.jpeg',
    description: 'Hampi is an ancient village in southern India, dotted with numerous ruined temple complexes from the Vijayanagara Empire, set amidst a surreal boulder-strewn landscape.',
    country: 'India',
    bestTime: 'October–February',
    popularFor: 'Temple ruins, boulder landscapes, history',
    rating: 4.6
  },
  {
    name: 'Great Wall of China',
    genre: 'Historical & Heritage',
    image: 'https://images.pexels.com/photos/17615498/pexels-photo-17615498.jpeg',
    description: 'The Great Wall of China is an ancient series of walls and fortifications, stretching over 13,000 miles, built to protect Chinese states from invasions.',
    country: 'China',
    bestTime: 'April–June, September–November',
    popularFor: 'Ancient wall, hiking, panoramic views',
    rating: 4.9
  },

  // Urban & Modern
  {
    name: 'Tokyo',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/2341282/pexels-photo-2341282.jpeg',
    description: 'Tokyo is a dazzling metropolis where ancient temples meet neon-lit skyscrapers. Known for its cutting-edge technology, world-class cuisine, and vibrant pop culture, it offers a unique blend of tradition and innovation.',
    country: 'Japan',
    bestTime: 'March–May, September–November',
    popularFor: 'Technology, cherry blossoms, cuisine, shopping',
    rating: 4.9
  },
  {
    name: 'New York',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg',
    description: 'New York City is the city that never sleeps, famous for its iconic skyline, Broadway shows, diverse neighborhoods, and world-renowned museums.',
    country: 'United States',
    bestTime: 'April–June, September–November',
    popularFor: 'Skyscrapers, Broadway, museums, nightlife',
    rating: 4.8
  },
  {
    name: 'London',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg',
    description: 'London is a global city with a rich history, iconic landmarks like Big Ben and the Tower Bridge, and a thriving arts and culinary scene.',
    country: 'United Kingdom',
    bestTime: 'May–September',
    popularFor: 'Landmarks, museums, theater, shopping',
    rating: 4.8
  },
  {
    name: 'Dubai',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg',
    description: 'Dubai is a futuristic city in the desert, known for its luxury shopping, ultramodern architecture, and lively nightlife. The Burj Khalifa and Palm Jumeirah are must-sees.',
    country: 'United Arab Emirates',
    bestTime: 'November–March',
    popularFor: 'Skyscrapers, shopping, luxury, desert safaris',
    rating: 4.7
  },
  {
    name: 'Shanghai',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/745243/pexels-photo-745243.jpeg',
    description: "Shanghai is China's largest city, famous for its futuristic skyline, historic Bund, and vibrant street life. It's a hub of finance, fashion, and culture.",
    country: 'China',
    bestTime: 'March–May, September–November',
    popularFor: 'Skyline, The Bund, shopping, cuisine',
    rating: 4.7
  },
  {
    name: 'Las Vegas',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/2837909/pexels-photo-2837909.jpeg',
    description: 'Las Vegas is the entertainment capital of the world, known for its vibrant nightlife, casinos, luxury resorts, and spectacular shows.',
    country: 'United States',
    bestTime: 'March–May, September–November',
    popularFor: 'Casinos, nightlife, shows, luxury hotels',
    rating: 4.6
  },
  {
    name: 'Ibiza',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/32639859/pexels-photo-32639859.jpeg',
    description: "Ibiza is a Spanish island famous for its legendary nightlife, beautiful beaches, and bohemian spirit. It's a hotspot for music lovers and partygoers.",
    country: 'Spain',
    bestTime: 'May–October',
    popularFor: 'Nightlife, beaches, music festivals',
    rating: 4.7
  },
  {
    name: 'Singapore',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg',
    description: 'Singapore is a modern city-state known for its cleanliness, futuristic architecture, lush gardens, and diverse food scene.',
    country: 'Singapore',
    bestTime: 'February–April, July–September',
    popularFor: 'Gardens by the Bay, food, shopping, skyline',
    rating: 4.8
  },
  {
    name: 'Hong Kong',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/1337144/pexels-photo-1337144.jpeg',
    description: 'Hong Kong is a vibrant metropolis with a dramatic skyline, bustling harbor, and a unique blend of Eastern and Western cultures.',
    country: 'China',
    bestTime: 'October–December, March–May',
    popularFor: 'Skyline, Victoria Peak, shopping, cuisine',
    rating: 4.7
  },
  {
    name: 'Sydney',
    genre: 'Urban & Modern',
    image: 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg',
    description: "Sydney is Australia's largest city, famous for its iconic Opera House, Harbour Bridge, and beautiful beaches like Bondi and Manly.",
    country: 'Australia',
    bestTime: 'September–November, March–May',
    popularFor: 'Opera House, beaches, harbor, outdoor lifestyle',
    rating: 4.8
  },

  // Cultural & Religious
  {
    name: 'Kyoto',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
    description: "Kyoto is Japan's cultural heart, renowned for its ancient temples, traditional tea houses, and beautiful cherry blossoms. The city preserves centuries-old traditions and hosts vibrant festivals.",
    country: 'Japan',
    bestTime: 'March–May, October–November',
    popularFor: 'Temples, cherry blossoms, tea ceremonies',
    rating: 4.9
  },
  {
    name: 'Florence',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg',
    description: 'Florence is the cradle of the Renaissance, famous for its art, architecture, and rich cultural heritage. Highlights include the Duomo, Uffizi Gallery, and Ponte Vecchio.',
    country: 'Italy',
    bestTime: 'May–September',
    popularFor: 'Renaissance art, cathedrals, museums',
    rating: 4.8
  },
  {
    name: 'Varanasi',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/8112524/pexels-photo-8112524.jpeg',
    description: "Varanasi is one of the world's oldest cities, sacred to Hindus and famous for its ghats along the Ganges River, spiritual rituals, and vibrant festivals.",
    country: 'India',
    bestTime: 'October–March',
    popularFor: 'Ghats, spiritual rituals, festivals',
    rating: 4.7
  },
  {
    name: 'Mecca',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/4118038/pexels-photo-4118038.jpeg',
    description: 'Mecca is the holiest city in Islam, drawing millions of pilgrims annually for the Hajj. The city is home to the Masjid al-Haram and the Kaaba.',
    country: 'Saudi Arabia',
    bestTime: 'During Hajj (varies), November–February',
    popularFor: 'Hajj pilgrimage, Masjid al-Haram, Kaaba',
    rating: 4.9
  },
  {
    name: 'Vatican City',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/3892129/pexels-photo-3892129.jpeg',
    description: "Vatican City is the spiritual and administrative center of the Roman Catholic Church, home to St. Peter's Basilica, the Vatican Museums, and the Pope.",
    country: 'Vatican City',
    bestTime: 'April–June, September–October',
    popularFor: "St. Peter's Basilica, Vatican Museums, papal events",
    rating: 4.8
  },
  {
    name: 'Pushkar',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/18474918/pexels-photo-18474918.jpeg',
    description: 'Pushkar is a sacred Hindu town in Rajasthan, India, famous for its holy lake, Brahma temple, and the annual Pushkar Camel Fair.',
    country: 'India',
    bestTime: 'October–March',
    popularFor: 'Camel fair, temples, holy lake',
    rating: 4.6
  },
  {
    name: 'Jerusalem',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/2087387/pexels-photo-2087387.jpeg',
    description: 'Jerusalem is a city of profound religious significance, sacred to Jews, Christians, and Muslims. It is home to the Western Wall, Church of the Holy Sepulchre, and Al-Aqsa Mosque.',
    country: 'Israel',
    bestTime: 'April–May, September–November',
    popularFor: 'Religious sites, Old City, history',
    rating: 4.8
  },
  {
    name: 'Istanbul',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/6152147/pexels-photo-6152147.jpeg',
    description: 'Istanbul is a city straddling Europe and Asia, known for its rich history, stunning mosques, and vibrant bazaars. Highlights include Hagia Sophia and the Blue Mosque.',
    country: 'Turkey',
    bestTime: 'April–June, September–November',
    popularFor: 'Mosques, bazaars, historic sites',
    rating: 4.8
  },
  {
    name: 'Rio de Janeiro',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg',
    description: 'Rio de Janeiro is famous for its vibrant Carnival, Christ the Redeemer statue, and lively samba culture. The city is a melting pot of traditions and faiths.',
    country: 'Brazil',
    bestTime: 'December–March (Carnival), May–October',
    popularFor: 'Carnival, Christ the Redeemer, samba',
    rating: 4.7
  },
  {
    name: 'Lhasa',
    genre: 'Cultural & Religious',
    image: 'https://images.pexels.com/photos/31013239/pexels-photo-31013239.jpeg',
    description: 'Lhasa is the spiritual heart of Tibet, home to the Potala Palace and Jokhang Temple. It is a center of Tibetan Buddhism and pilgrimage.',
    country: 'China (Tibet)',
    bestTime: 'May–October',
    popularFor: 'Potala Palace, Jokhang Temple, Tibetan culture',
    rating: 4.7
  },

  // Adventure & Sports
  {
    name: 'Queenstown',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/2226900/pexels-photo-2226900.jpeg',
    description: 'Queenstown is known as the adventure capital of the world, offering bungee jumping, skydiving, white-water rafting, and skiing amidst stunning alpine scenery.',
    country: 'New Zealand',
    bestTime: 'December–February (summer), June–August (skiing)',
    popularFor: 'Bungee jumping, skiing, adventure sports',
    rating: 4.9
  },
  {
    name: 'Chamonix',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/1789492/pexels-photo-1789492.jpeg',
    description: 'Chamonix is a world-famous destination for mountaineering, skiing, and hiking, nestled at the foot of Mont Blanc in the French Alps.',
    country: 'France',
    bestTime: 'December–April (skiing), June–September (hiking)',
    popularFor: 'Skiing, mountaineering, hiking',
    rating: 4.8
  },
  {
    name: 'Interlaken',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/922978/pexels-photo-922978.jpeg',
    description: 'Interlaken is a Swiss resort town famed for its adventure sports, including paragliding, skydiving, and canyoning, set between two beautiful lakes.',
    country: 'Switzerland',
    bestTime: 'June–September',
    popularFor: 'Paragliding, skydiving, canyoning',
    rating: 4.7
  },
  {
    name: 'Costa Rica',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/2024534/pexels-photo-2024534.jpeg',
    description: 'Costa Rica is a paradise for adventure seekers, offering zip-lining, surfing, white-water rafting, and volcano hikes in lush rainforests.',
    country: 'Costa Rica',
    bestTime: 'December–April',
    popularFor: 'Zip-lining, surfing, volcano hikes',
    rating: 4.8
  },
  {
    name: 'Moab',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/5117917/pexels-photo-5117917.jpeg',
    description: 'Moab, Utah, is a mecca for mountain biking, rock climbing, and off-roading, surrounded by dramatic red rock landscapes and national parks.',
    country: 'United States',
    bestTime: 'March–May, September–November',
    popularFor: 'Mountain biking, rock climbing, off-roading',
    rating: 4.7
  },
  {
    name: 'Whistler',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/2084338/pexels-photo-2084338.jpeg',
    description: 'Whistler is a premier ski resort in Canada, also popular for mountain biking, zip-lining, and hiking in the summer.',
    country: 'Canada',
    bestTime: 'December–March (skiing), June–September (summer activities)',
    popularFor: 'Skiing, mountain biking, zip-lining',
    rating: 4.8
  },
  {
    name: 'Cape Town',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/4873257/pexels-photo-4873257.jpeg',
    description: 'Cape Town offers a mix of adventure activities, from shark cage diving and surfing to hiking up Table Mountain, all set against a stunning coastal backdrop.',
    country: 'South Africa',
    bestTime: 'October–April',
    popularFor: 'Shark cage diving, surfing, hiking',
    rating: 4.7
  },
  {
    name: 'Patagonia',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/3158519/pexels-photo-3158519.jpeg',
    description: 'Patagonia, spanning Argentina and Chile, is a wild region known for trekking, glacier hiking, and breathtaking landscapes.',
    country: 'Argentina/Chile',
    bestTime: 'November–March',
    popularFor: 'Trekking, glacier hiking, nature',
    rating: 4.9
  },
  {
    name: 'Banff',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/2894366/pexels-photo-2894366.jpeg',
    description: 'Banff National Park in Canada is a haven for outdoor enthusiasts, offering hiking, skiing, canoeing, and wildlife viewing in the Rockies.',
    country: 'Canada',
    bestTime: 'June–September (hiking), December–March (skiing)',
    popularFor: 'Hiking, skiing, wildlife',
    rating: 4.8
  },
  {
    name: 'Queenstown',
    genre: 'Adventure & Sports',
    image: 'https://images.pexels.com/photos/2226900/pexels-photo-2226900.jpeg',
    description: 'Queenstown is known as the adventure capital of the world, offering bungee jumping, skydiving, white-water rafting, and skiing amidst stunning alpine scenery.',
    country: 'New Zealand',
    bestTime: 'December–February (summer), June–August (skiing)',
    popularFor: 'Bungee jumping, skiing, adventure sports',
    rating: 4.9
  },

  // Wellness & Relaxation
  {
    name: 'Bali',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
    description: 'Bali is a tropical paradise known for its serene beaches, lush rice terraces, yoga retreats, and luxurious spas, making it a top destination for relaxation and rejuvenation.',
    country: 'Indonesia',
    bestTime: 'April–October',
    popularFor: 'Beaches, yoga retreats, spas',
    rating: 4.9
  },
  {
    name: 'Sedona',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/206701/pexels-photo-206701.jpeg',
    description: 'Sedona, Arizona, is famed for its red rock formations, spiritual vortexes, and wellness resorts, attracting visitors seeking healing and tranquility.',
    country: 'United States',
    bestTime: 'March–May, September–November',
    popularFor: 'Spiritual retreats, hiking, spas',
    rating: 4.7
  },
  {
    name: 'Santorini',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg',
    description: 'Santorini is a Greek island famous for its whitewashed villages, stunning sunsets, and luxurious resorts, offering a perfect escape for relaxation.',
    country: 'Greece',
    bestTime: 'April–October',
    popularFor: 'Sunsets, luxury resorts, beaches',
    rating: 4.8
  },
  {
    name: 'Maldives',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',
    description: 'The Maldives is a collection of idyllic islands in the Indian Ocean, renowned for its overwater bungalows, crystal-clear waters, and world-class spas.',
    country: 'Maldives',
    bestTime: 'November–April',
    popularFor: 'Overwater bungalows, snorkeling, spas',
    rating: 4.9
  },
  {
    name: 'Ubud',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/19473996/pexels-photo-19473996.jpeg',
    description: 'Ubud, in the heart of Bali, is a center for yoga, meditation, and holistic healing, surrounded by lush jungle and rice paddies.',
    country: 'Indonesia',
    bestTime: 'April–October',
    popularFor: 'Yoga, meditation, wellness retreats',
    rating: 4.8
  },
  {
    name: 'Tulum',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/90947/pexels-photo-90947.jpeg',
    description: 'Tulum is a laid-back beach town in Mexico, known for its eco-chic resorts, yoga studios, and Mayan ruins by the sea.',
    country: 'Mexico',
    bestTime: 'November–April',
    popularFor: 'Beaches, yoga, eco-resorts',
    rating: 4.7
  },
  {
    name: 'Lake Louise',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/5226950/pexels-photo-5226950.jpeg',
    description: 'Lake Louise in Canada is a tranquil mountain retreat, offering spa resorts, canoeing, and breathtaking alpine scenery.',
    country: 'Canada',
    bestTime: 'June–September',
    popularFor: 'Spa resorts, canoeing, mountain views',
    rating: 4.8
  },
  {
    name: 'Phuket',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/1481096/pexels-photo-1481096.jpeg',
    description: "Phuket is Thailand's largest island, famous for its luxury wellness resorts, tropical beaches, and vibrant nightlife.",
    country: 'Thailand',
    bestTime: 'November–April',
    popularFor: 'Wellness resorts, beaches, nightlife',
    rating: 4.7
  },
  {
    name: 'Amalfi Coast',
    genre: 'Wellness & Relaxation',
    image: 'https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg',
    description: 'The Amalfi Coast in Italy is a picturesque stretch of coastline, dotted with charming villages, luxury hotels, and serene beaches.',
    country: 'Italy',
    bestTime: 'May–September',
    popularFor: 'Luxury hotels, beaches, scenic views',
    rating: 4.8
  },
  {
    name: 'Blue Lagoon',
    genre: 'Wellness & Relaxation',
    image: 'https://i.insider.com/57a0b9b0d7c3dbb8028b5e33?width=700',
    description: 'The Blue Lagoon in Iceland is a geothermal spa renowned for its mineral-rich waters and unique volcanic landscape.',
    country: 'Iceland',
    bestTime: 'June–August',
    popularFor: 'Geothermal spa, relaxation, unique landscape',
    rating: 4.7
  },

  // Shopping & Luxury
  {
    name: 'Paris',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg',
    description: 'Paris is the fashion capital of the world, offering luxury boutiques, designer brands, and elegant shopping avenues like the Champs-Élysées and Avenue Montaigne.',
    country: 'France',
    bestTime: 'April–June, September–November',
    popularFor: 'Luxury shopping, designer brands, fashion',
    rating: 4.9
  },
  {
    name: 'Dubai',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/712380/pexels-photo-712380.jpeg',
    description: "Dubai is a shopper's paradise, home to extravagant malls, gold souks, and luxury hotels, with the annual Dubai Shopping Festival drawing visitors worldwide.",
    country: 'UAE',
    bestTime: 'November–March',
    popularFor: 'Luxury malls, gold souks, shopping festival',
    rating: 4.8
  },
  {
    name: 'Milan',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/8430364/pexels-photo-8430364.jpeg',
    description: "Milan is Italy's style capital, renowned for its high-end fashion houses, designer boutiques, and the glamorous Galleria Vittorio Emanuele II.",
    country: 'Italy',
    bestTime: 'April–June, September–October',
    popularFor: 'Fashion, designer boutiques, luxury shopping',
    rating: 4.8
  },
  {
    name: 'London',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/3458997/pexels-photo-3458997.jpeg',
    description: 'London offers a blend of luxury shopping districts like Bond Street and Harrods, alongside historic markets and exclusive hotels.',
    country: 'United Kingdom',
    bestTime: 'May–September',
    popularFor: 'Luxury shopping, exclusive hotels, markets',
    rating: 4.8
  },
  {
    name: 'New York',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/7078496/pexels-photo-7078496.jpeg',
    description: 'New York City is famed for its luxury department stores, Fifth Avenue boutiques, and world-class hotels, making it a top destination for shoppers.',
    country: 'United States',
    bestTime: 'April–June, September–November',
    popularFor: 'Department stores, Fifth Avenue, luxury hotels',
    rating: 4.8
  },
  {
    name: 'Hong Kong',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/2614855/pexels-photo-2614855.jpeg',
    description: 'Hong Kong is a global shopping hub, offering everything from luxury malls to bustling street markets and duty-free shopping.',
    country: 'Hong Kong',
    bestTime: 'October–December',
    popularFor: 'Luxury malls, street markets, duty-free',
    rating: 4.7
  },
  {
    name: 'Singapore',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/15104342/pexels-photo-15104342.jpeg',
    description: 'Singapore is known for its high-end shopping on Orchard Road, luxury hotels, and vibrant nightlife.',
    country: 'Singapore',
    bestTime: 'February–April, July–September',
    popularFor: 'Orchard Road, luxury hotels, nightlife',
    rating: 4.7
  },
  {
    name: 'Los Angeles',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/2539437/pexels-photo-2539437.jpeg',
    description: 'Los Angeles is home to luxury shopping destinations like Rodeo Drive, designer boutiques, and glamorous hotels.',
    country: 'United States',
    bestTime: 'March–May, September–November',
    popularFor: 'Rodeo Drive, designer boutiques, luxury hotels',
    rating: 4.7
  },
  {
    name: 'Istanbul',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/2381048/pexels-photo-2381048.jpeg',
    description: 'Istanbul offers a unique shopping experience, from historic bazaars like the Grand Bazaar to luxury malls and waterfront boutiques.',
    country: 'Turkey',
    bestTime: 'April–June, September–November',
    popularFor: 'Grand Bazaar, luxury malls, waterfront boutiques',
    rating: 4.7
  },
  {
    name: 'Doha',
    genre: 'Shopping & Luxury',
    image: 'https://images.pexels.com/photos/6782565/pexels-photo-6782565.jpeg',
    description: "Doha, Qatar's capital, is known for its opulent malls, luxury hotels, and traditional souks, blending modernity with Arabian heritage.",
    country: 'Qatar',
    bestTime: 'November–April',
    popularFor: 'Opulent malls, luxury hotels, souks',
    rating: 4.6
  },

  // Eco & Sustainable
  {
    name: 'Costa Rica',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/539681/pexels-photo-539681.jpeg',
    description: 'Costa Rica is a global leader in eco-tourism, offering lush rainforests, wildlife reserves, and sustainable lodges that protect biodiversity.',
    country: 'Costa Rica',
    bestTime: 'December–April',
    popularFor: 'Eco-lodges, rainforests, wildlife',
    rating: 4.9
  },
  {
    name: 'Galápagos Islands',
    genre: 'Eco & Sustainable',
    image: 'https://i.pinimg.com/736x/da/af/f9/daaff913d21717c9145c6793031d68f6.jpg',
    description: 'The Galápagos Islands are a UNESCO World Heritage site, famous for unique wildlife, pristine beaches, and strict conservation efforts.',
    country: 'Ecuador',
    bestTime: 'June–December',
    popularFor: 'Wildlife, conservation, pristine beaches',
    rating: 4.9
  },
  {
    name: 'Norwegian Fjords',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/10304563/pexels-photo-10304563.jpeg',
    description: "Norway's fjords are celebrated for their dramatic scenery and sustainable tourism practices, including eco-friendly cruises and hiking trails.",
    country: 'Norway',
    bestTime: 'May–September',
    popularFor: 'Fjords, eco-cruises, hiking',
    rating: 4.8
  },
  {
    name: 'New Zealand',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/724963/pexels-photo-724963.png',
    description: 'New Zealand is renowned for its commitment to conservation, offering eco-friendly adventures in national parks and Maori cultural experiences.',
    country: 'New Zealand',
    bestTime: 'December–February',
    popularFor: 'National parks, eco-adventures, Maori culture',
    rating: 4.8
  },
  {
    name: 'Bhutan',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/15319433/pexels-photo-15319433.jpeg',
    description: 'Bhutan is a Himalayan kingdom focused on Gross National Happiness and environmental preservation, with strict limits on tourism to protect its culture and nature.',
    country: 'Bhutan',
    bestTime: 'March–May, September–November',
    popularFor: 'Himalayan scenery, sustainable tourism, culture',
    rating: 4.8
  },
  {
    name: 'Kenya',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/11759843/pexels-photo-11759843.jpeg',
    description: 'Kenya offers eco-friendly safaris in the Maasai Mara, supporting wildlife conservation and local communities.',
    country: 'Kenya',
    bestTime: 'July–October',
    popularFor: 'Eco-safaris, wildlife, Maasai culture',
    rating: 4.7
  },
  {
    name: 'Iceland',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/30755287/pexels-photo-30755287.jpeg',
    description: 'Iceland is a leader in renewable energy and sustainable tourism, with geothermal spas, waterfalls, and eco-friendly tours.',
    country: 'Iceland',
    bestTime: 'June–August',
    popularFor: 'Geothermal spas, waterfalls, eco-tours',
    rating: 4.8
  },
  {
    name: 'Slovenia',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/4263627/pexels-photo-4263627.jpeg',
    description: 'Slovenia is recognized for its green tourism, with sustainable cities, pristine lakes, and eco-certified accommodations.',
    country: 'Slovenia',
    bestTime: 'May–September',
    popularFor: 'Green tourism, lakes, eco-hotels',
    rating: 4.7
  },
  {
    name: 'Tasmania',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/305810/pexels-photo-305810.jpeg',
    description: 'Tasmania is an island state of Australia known for its wild landscapes, national parks, and commitment to conservation.',
    country: 'Australia',
    bestTime: 'December–February',
    popularFor: 'National parks, wildlife, conservation',
    rating: 4.7
  },
  {
    name: 'Palau',
    genre: 'Eco & Sustainable',
    image: 'https://images.pexels.com/photos/8356065/pexels-photo-8356065.jpeg',
    description: 'Palau is a Pacific island nation celebrated for its marine biodiversity and pioneering environmental protection laws.',
    country: 'Palau',
    bestTime: 'November–April',
    popularFor: 'Marine biodiversity, eco-laws, diving',
    rating: 4.7
  },

  // Educational & Scientific
  {
    name: 'CERN',
    genre: 'Educational & Scientific',
    image: 'https://afar.brightspotcdn.com/dims4/default/b68bdde/2147483647/strip/false/crop/4032x3024+0+0/resize/1486x1115!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fac%2Fd6%2Ffa7888104cd3a55d01ee7518cd3b%2Fimg-20170515-121328.jpg',
    description: "CERN, the European Organization for Nuclear Research, is the world's largest particle physics laboratory, offering tours and exhibitions about cutting-edge science.",
    country: 'Switzerland',
    bestTime: 'April–October',
    popularFor: 'Particle physics, science tours, exhibitions',
    rating: 4.8
  },
  {
    name: 'Smithsonian Institution',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/29704416/pexels-photo-29704416.jpeg',
    description: "The Smithsonian Institution in Washington, D.C., is the world's largest museum complex, featuring 19 museums and galleries covering art, history, and science.",
    country: 'United States',
    bestTime: 'March–June, September–November',
    popularFor: 'Museums, history, science',
    rating: 4.9
  },
  {
    name: 'Oxford',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/28448938/pexels-photo-28448938.jpeg',
    description: "Oxford is home to the University of Oxford, one of the world's oldest and most prestigious universities, with historic colleges and libraries.",
    country: 'United Kingdom',
    bestTime: 'May–September',
    popularFor: 'University, libraries, history',
    rating: 4.8
  },
  {
    name: 'Cambridge',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/31771446/pexels-photo-31771446.jpeg',
    description: 'Cambridge is renowned for its university, beautiful college buildings, and contributions to science and literature.',
    country: 'United Kingdom',
    bestTime: 'May–September',
    popularFor: 'University, science, architecture',
    rating: 4.8
  },
  {
    name: 'Silicon Valley',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/18452802/pexels-photo-18452802.jpeg',
    description: 'Silicon Valley is the global center for technology and innovation, home to major tech companies, museums, and science centers.',
    country: 'United States',
    bestTime: 'April–October',
    popularFor: 'Tech companies, innovation, science centers',
    rating: 4.7
  },
  {
    name: 'Paris',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg',
    description: "Paris is a hub for art, history, and science, with world-class museums like the Louvre, Musée d'Orsay, and Cité des Sciences.",
    country: 'France',
    bestTime: 'April–June, September–November',
    popularFor: 'Museums, art, science',
    rating: 4.8
  },
  {
    name: 'Boston',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/776030/pexels-photo-776030.jpeg',
    description: 'Boston is known for its prestigious universities, historic sites, and science museums, making it a center for learning and innovation.',
    country: 'United States',
    bestTime: 'May–October',
    popularFor: 'Universities, history, science museums',
    rating: 4.7
  },
  {
    name: 'Heidelberg',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/5644343/pexels-photo-5644343.jpeg',
    description: 'Heidelberg is a picturesque German city known for its historic university, research institutes, and beautiful old town.',
    country: 'Germany',
    bestTime: 'May–September',
    popularFor: 'University, research, old town',
    rating: 4.7
  },
  {
    name: 'Kyoto',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
    description: 'Kyoto is not only a cultural center but also a place of academic excellence, with top universities and research centers.',
    country: 'Japan',
    bestTime: 'March–May, October–November',
    popularFor: 'Universities, research, culture',
    rating: 4.7
  },
  {
    name: 'Geneva',
    genre: 'Educational & Scientific',
    image: 'https://images.pexels.com/photos/32545864/pexels-photo-32545864.jpeg',
    description: 'Geneva is a global center for diplomacy, science, and education, home to the United Nations and many international organizations.',
    country: 'Switzerland',
    bestTime: 'May–September',
    popularFor: 'Diplomacy, science, international organizations',
    rating: 4.7
  },

  // Food & Culinary
  {
    name: 'Bangkok',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/708764/pexels-photo-708764.jpeg',
    description: "Bangkok is a street food paradise, offering a dizzying array of flavors from spicy curries to sweet mango sticky rice, with bustling night markets and world-class restaurants.",
    country: 'Thailand',
    bestTime: 'November–February',
    popularFor: 'Street food, night markets, Thai cuisine',
    rating: 4.9
  },
  {
    name: 'Paris',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/2574631/pexels-photo-2574631.jpeg',
    description: 'Paris is a culinary capital, renowned for its bakeries, patisseries, Michelin-starred restaurants, and vibrant café culture.',
    country: 'France',
    bestTime: 'April–June, September–November',
    popularFor: 'Bakeries, patisseries, fine dining',
    rating: 4.9
  },
  {
    name: 'Tokyo',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg',
    description: 'Tokyo boasts the most Michelin-starred restaurants in the world, with everything from sushi counters to ramen shops and izakayas.',
    country: 'Japan',
    bestTime: 'March–May, September–November',
    popularFor: 'Sushi, ramen, Michelin restaurants',
    rating: 4.9
  },
  {
    name: 'Istanbul',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/2048865/pexels-photo-2048865.jpeg',
    description: 'Istanbul is a crossroads of flavors, blending Turkish, Mediterranean, and Middle Eastern cuisines in its vibrant markets and restaurants.',
    country: 'Turkey',
    bestTime: 'April–June, September–November',
    popularFor: 'Turkish cuisine, street food, markets',
    rating: 4.8
  },
  {
    name: 'Barcelona',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    description: 'Barcelona is famous for its tapas bars, seafood, and Catalan cuisine, with bustling markets like La Boqueria.',
    country: 'Spain',
    bestTime: 'May–June, September–October',
    popularFor: 'Tapas, seafood, Catalan cuisine',
    rating: 4.8
  },
  {
    name: 'New Orleans',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/2432110/pexels-photo-2432110.jpeg',
    description: 'New Orleans is a melting pot of flavors, known for Creole and Cajun cuisine, jazz brunches, and lively food festivals.',
    country: 'United States',
    bestTime: 'February–May',
    popularFor: 'Creole cuisine, jazz brunches, food festivals',
    rating: 4.7
  },
  {
    name: 'Lima',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/14060359/pexels-photo-14060359.jpeg',
    description: 'Lima is the gastronomic capital of South America, celebrated for its ceviche, fusion cuisine, and award-winning restaurants.',
    country: 'Peru',
    bestTime: 'December–April',
    popularFor: 'Ceviche, fusion cuisine, top restaurants',
    rating: 4.8
  },
  {
    name: 'Rome',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
    description: 'Rome is a haven for food lovers, offering classic Italian dishes, bustling trattorias, and vibrant food markets.',
    country: 'Italy',
    bestTime: 'April–June, September–October',
    popularFor: 'Italian cuisine, trattorias, food markets',
    rating: 4.8
  },
  {
    name: 'Marrakech',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/2227214/pexels-photo-2227214.jpeg',
    description: 'Marrakech is a feast for the senses, with aromatic spices, bustling souks, and traditional Moroccan dishes like tagine and couscous.',
    country: 'Morocco',
    bestTime: 'March–May, September–November',
    popularFor: 'Moroccan cuisine, souks, spices',
    rating: 4.7
  },
  {
    name: 'Hanoi',
    genre: 'Food & Culinary',
    image: 'https://images.pexels.com/photos/2181419/pexels-photo-2181419.jpeg',
    description: 'Hanoi is known for its vibrant street food scene, with specialties like pho, bun cha, and egg coffee.',
    country: 'Vietnam',
    bestTime: 'October–April',
    popularFor: 'Street food, pho, local markets',
    rating: 4.7
  }
];

const DESTINATIONS_PER_PAGE = 10;

const GENRE_EMOJIS = {
  'Nature & Scenic': '🌍',
  'Historical & Heritage': '🏰',
  'Urban & Modern': '🏙️',
  'Cultural & Religious': '🎨',
  'Adventure & Sports': '🎢',
  'Wellness & Relaxation': '🧖',
  'Shopping & Luxury': '🛍️',
  'Eco & Sustainable': '🌿',
  'Educational & Scientific': '🎓',
  'Food & Culinary': '🍷'
};

/**
 * Helper to get 10 destinations from 3 random genres, shuffled and distributed.
 */
function getRandomizedPageDestinations(destinations, genres, page, perPage = 10) {
  // Pick 3 random genres
  const shuffledGenres = [...genres].sort(() => 0.5 - Math.random());
  const pageGenres = shuffledGenres.slice(0, 3);
  // Get all destinations for those genres
  const genreDestMap = pageGenres.map(
    genre => destinations.filter(dest => dest.genre === genre)
  );
  // Shuffle each genre's destinations
  genreDestMap.forEach(arr => arr.sort(() => 0.5 - Math.random()));
  // Distribute destinations as evenly as possible
  const result = [];
  let i = 0;
  while (result.length < perPage && (genreDestMap[0].length || genreDestMap[1].length || genreDestMap[2].length)) {
    for (let g = 0; g < 3; g++) {
      if (genreDestMap[g].length && result.length < perPage) {
        result.push(genreDestMap[g].shift());
      }
    }
    i++;
    if (i > 20) break; // safety
  }
  // Shuffle the final result so genres are not grouped
  return { pageDestinations: result.sort(() => 0.5 - Math.random()), pageGenres };
}

const DestinationsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [pageData, setPageData] = useState({ pageDestinations: [], pageGenres: [] });
  const [favorites, setFavorites] = useState(new Set());
  const [currentTime, setCurrentTime] = useState('');
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (selectedGenre === 'All') {
      setPageData(getRandomizedPageDestinations(DESTINATIONS, GENRES, currentPage, 10));
    } else {
      const filtered = DESTINATIONS.filter(dest => dest.genre === selectedGenre);
      const start = (currentPage - 1) * 10;
      const end = start + 10;
      setPageData({
        pageDestinations: filtered.slice(start, end),
        pageGenres: [selectedGenre]
      });
    }
  }, [currentPage, selectedGenre]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch favorites from backend on mount and when user changes
    if (isLoggedIn && user && user._id) {
      userAPI.getFavorites(user._id)
        .then(res => {
          setFavorites(new Set(res.favorites || []));
        })
        .catch(err => {
          console.error('Failed to fetch favorites:', err);
        });
    } else {
      setFavorites(new Set());
    }
  }, [isLoggedIn, user]);

  const handleFavorite = async (name) => {
    if (!isLoggedIn || !user || !user._id) {
      alert('Please log in to use favorites!');
      return;
    }
    try {
      if (favorites.has(name)) {
        await userAPI.removeFavorite(user._id, name);
      } else {
        await userAPI.addFavorite(user._id, name);
      }
      // Refetch favorites from backend for immediate UI update
      const res = await userAPI.getFavorites(user._id);
      setFavorites(new Set(res.favorites || []));
    } catch (err) {
      console.error('Failed to update favorite:', err);
    }
  };

  // Calculate total pages (use all destinations at least once)
  const filteredArr = selectedGenre === 'All' ? DESTINATIONS : DESTINATIONS.filter(dest => dest.genre === selectedGenre);
  const totalPages = Math.ceil(filteredArr.length / 10);

  // Genre list for filter bar
  const genreList = ['All', ...GENRES];

  return (
    <>
      <Header />
      <div className="destinations-hero-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="destinations-hero-video"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="destinations-hero-overlay">
          <h1 className="destinations-hero-title">Explore Destinations</h1>
          <p className="destinations-hero-subtitle">Discover amazing places by genre, handpicked for you!</p>
        </div>
      </div>
      <div className="destinations-list-page">
        <h1 className="destinations-list-title">Explore Destinations</h1>
        <div className="genre-filter-bar">
          {genreList.map(genre => (
            <button
              key={genre}
              className={`genre-filter-btn${selectedGenre === genre ? ' active' : ''}`}
              onClick={() => { setSelectedGenre(genre); setCurrentPage(1); }}
            >
              {GENRE_EMOJIS[genre]} {genre}
            </button>
          ))}
        </div>
        <div className="random-genres-section">
          <h2>Featured Genres</h2>
          <div className="random-genres-list">
            {pageData.pageGenres.map(genre => (
              <span className="random-genre-badge" key={genre}>{genre}</span>
            ))}
          </div>
        </div>
        <div className="destinations-horizontal-list">
          {pageData.pageDestinations.map((dest, idx) => (
            <div className="destination-horizontal-card" key={idx}>
              <div className="destination-horizontal-image-wrapper">
                <img src={dest.image} alt={dest.name} className="destination-horizontal-image" />
              </div>
              <div className="destination-horizontal-info">
                <div className="destination-horizontal-header">
                  <h3>{dest.name}</h3>
                  <button className={`destination-fav-btn${favorites.has(dest.name) ? ' active' : ''}`} onClick={() => handleFavorite(dest.name)}>
                    <span role="img" aria-label="favorite">{favorites.has(dest.name) ? '❤️' : '🤍'}</span>
                  </button>
                </div>
                <div className="destination-horizontal-rating">
                  <span role="img" aria-label="star">⭐</span> {dest.rating || (4 + (idx % 2) + (Math.random() * 0.5)).toFixed(1)}
                  <span className="destination-horizontal-genre">{dest.genre}</span>
                </div>
                <p className="destination-horizontal-desc">{dest.description}</p>
                <div className="destination-horizontal-details">
                  <span><strong>Country:</strong> {dest.country || 'Unknown'}</span>
                  <span><strong>Best Time:</strong> {dest.bestTime || 'Year-round'}</span>
                  <span><strong>Popular for:</strong> {dest.popularFor || 'Travel & Exploration'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-bar">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          {(() => {
            const pages = [];
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, currentPage + 1);
            if (currentPage === 1) {
              endPage = Math.min(totalPages, 3);
            }
            if (currentPage === totalPages) {
              startPage = Math.max(1, totalPages - 2);
            }
            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button
                  key={i}
                  className={`pagination-btn${currentPage === i ? ' active' : ''}`}
                  onClick={() => setCurrentPage(i)}
                >
                  {i}
                </button>
              );
            }
            return pages;
          })()}
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-left">
              <div className="footer-status">
                <span className="status-indicator"></span>
                <span>All systems operational</span>
              </div>
              <div className="footer-time">
                <span className="time-display">{currentTime}</span>
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
            <p>© 2025 TravelEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default DestinationsList;
export { DESTINATIONS }; 