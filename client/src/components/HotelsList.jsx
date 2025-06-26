import React, { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import '../styles/HotelsList.css';
import heroVideo from '../assets/hotel.mp4';

const HOTEL_GENRES = [
  { type: 'Luxury Hotel', icon: '🛎️' },
  { type: 'Boutique Hotel', icon: '🎨' },
  { type: 'Business Hotel', icon: '💻' },
  { type: 'Budget Hotel', icon: '💸' },
  { type: 'Heritage Hotel', icon: '🏛️' },
];

const RESORT_GENRES = [
  { type: 'Beach Resort', icon: '🏖️' },
  { type: 'Mountain Resort', icon: '🏔️' },
  { type: 'Spa & Wellness Resort', icon: '💆‍♀️' },
  { type: 'Adventure Resort', icon: '🧗' },
  { type: 'All-Inclusive Resort', icon: '🍹' },
];

const ALL_GENRES = [...HOTEL_GENRES, ...RESORT_GENRES];

// Sample amenities
const AMENITIES = [
  'Free WiFi', 'Pool', 'Spa', 'Breakfast', 'Parking', 'Gym', 'Bar', 'Airport Shuttle', 'Pet Friendly', 'Restaurant'
];

// Helper to generate 10 hotels per genre
function generateHotels() {
  const hotels = [];
  const hotelNames = [
    // 10 for each genre, you can replace with more creative names if you want
    [
      'The Ritz-Carlton', 'Burj Al Arab', 'Taj Lake Palace', 'The Peninsula', 'Four Seasons',
      'The Savoy', 'Mandarin Oriental', 'Aman Tokyo', 'Hotel de Crillon', 'Park Hyatt'
    ],
    [
      'The Artist Residence', 'The Giri Residence', 'Hotel Saint Cecilia', 'The Rose Hotel', 'Villa Rosa Kempinski',
      'D.O.M Hotel', 'The Lokal', '25hours Hotel', 'The George', 'Raas'
    ],
    [
      'JW Marriott', 'Hilton Garden Inn', 'Hyatt Regency', 'The Oberoi', 'Sofitel',
      'Marriott Marquis', 'Novotel', 'InterContinental', 'Radisson Blu', 'Grand Mercure'
    ],
    [
      'Ibis Budget', 'OYO Rooms', 'easyHotel', 'Tune Hotels', 'HotelF1',
      'Red Planet Hotels', 'Capsule Inn', 'Zostel', 'Super 8', 'Treebo Hotels'
    ],
    [
      'Rambagh Palace', 'Raffles Hotel', 'Parador de Granada', 'Neemrana Fort Palace', 'Fairmont Le Château Frontenac',
      'The Shelbourne', 'Gritti Palace', 'Palacio Duhau', 'Umaid Bhawan Palace', 'The Mount Nelson'
    ],
    [
      'Soneva Fushi', 'Atlantis The Palm', 'Taj Exotica', 'Four Seasons Resort Maui', 'Banyan Tree Phuket',
      'Maroma Resort', 'The Oberoi Beach Resort', 'Trou aux Biches', 'Le Saint Géran', 'The Ritz-Carlton Cancún'
    ],
    [
      "Badrutt's Palace", 'Wildflower Hall', 'The Lodge Verbier', 'Fairmont Banff Springs', 'The Chedi Andermatt',
      'The Khyber Himalayan Resort', 'Amangani', 'COMO Uma Paro', 'The Little Nell', 'Six Senses Bhutan'
    ],
    [
      'Ananda in the Himalayas', 'SHA Wellness Clinic', 'Kamalaya', 'Como Shambhala', 'Vana Wellness',
      'The Ranch Malibu', 'Chiva-Som', 'Lefay Resort', 'Canyon Ranch', 'Amanemu'
    ],
    [
      'Mahali Mzuri', 'Explora Patagonia', 'Taj Safari Lodge', 'Singita Lebombo', 'Tierra Atacama',
      'Six Senses Zighy Bay', 'Wild Planet Resort', 'Inkaterra Reserva Amazonica', 'Amanwana', 'Pachira Lodge'
    ],
    [
      'Club Med Bali', 'Sandals Royal Bahamian', 'Barcelo Bavaro Palace', 'Secrets Maroma Beach', 'Beaches Turks & Caicos',
      'Grand Palladium', 'Iberostar Selection', 'The Leela Kovalam', 'Kurumba', 'Centara Grand'
    ]
  ];
  const luxuryHotelData = [
    {
      name: "The Ritz-Carlton",
      location: "New York, USA",
      description: "Renowned for luxury, impeccable service, and elegant accommodations, The Ritz-Carlton hotels are iconic destinations for discerning travelers.",
      price: 1000,
      priceInRupees: 83000,
      rating: 4.7,
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/07/4c/c9/exterior-nyccp.jpg?w=500&h=-1&s=1'
    },
    {
      name: "Burj Al Arab",
      location: "Dubai, United Arab Emirates",
      description: "Often described as the world's only 'seven-star' hotel, the Burj Al Arab is famous for its sail-shaped silhouette, opulent suites, and exceptional service.",
      price: 1500,
      priceInRupees: 124500,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3680912/pexels-photo-3680912.jpeg'
    },
    {
      name: "Taj Lake Palace",
      location: "Udaipur, India",
      description: "A floating vision of white marble and mosaic, the Taj Lake Palace offers a magical experience on Lake Pichola.",
      price: 800,
      priceInRupees: 66400,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/7362398/pexels-photo-7362398.jpeg'
    },
    {
      name: "The Peninsula",
      location: "Hong Kong, China",
      description: "A legendary hotel blending Eastern and Western hospitality, The Peninsula is known for its grandeur and service.",
      price: 700,
      priceInRupees: 58100,
      rating: 4.7,
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/8b/eb/72/caption.jpg?w=900&h=500&s=1'
    },
    {
      name: "Four Seasons Hotel",
      location: "Paris, France",
      description: "A symbol of Parisian luxury, the Four Seasons Hotel George V offers opulent rooms and Michelin-starred dining.",
      price: 1200,
      priceInRupees: 99600,
      rating: 4.7,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/294102199.jpg?k=c6c79806fa7ba4510c8c8a886cd0597cde2fdfe954fa4198dfb32a078470bb09&o=&hp=1'
    },
    {
      name: "The Savoy",
      location: "London, UK",
      description: "An iconic hotel on the Strand, The Savoy is renowned for its Art Deco style and world-class service.",
      price: 900,
      priceInRupees: 74700,
      rating: 4.7,
      image: 'https://www.ahstatic.com/photos/a597_ho_00_p_1024x768.jpg'
    },
    {
      name: "Mandarin Oriental",
      location: "Hong Kong, China",
      description: "A blend of luxury and heritage, Mandarin Oriental Hong Kong is a favorite among business and leisure travelers.",
      price: 600,
      priceInRupees: 49800,
      rating: 4.7,
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/587989312.jpg?k=e8a1106f74da8539b29f78604622dd46fa6e7c86349f499be6f6e61b8ffc49b2&o=&hp=1'
    },
    {
      name: "Aman Tokyo",
      location: "Tokyo, Japan",
      description: "Aman Tokyo offers minimalist luxury and panoramic city views, blending traditional Japanese design with modern comfort.",
      price: 1100,
      priceInRupees: 91300,
      rating: 4.8,
      image: 'https://media2.architecturemedia.net/site_media/media/cache/30/a2/30a2ca99a0a0537c2936a547220039c3.jpg'
    },
    {
      name: "Hotel de Crillon",
      location: "Paris, France",
      description: "A historic palace hotel on Place de la Concorde, Hotel de Crillon is a masterpiece of Parisian elegance.",
      price: 1300,
      priceInRupees: 107900,
      rating: 4.7,
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/H%C3%B4tels_Crillon_Cartier_Plessis_Belli%C3%A8re_Coislin_Paris_2.jpg'
    },
    {
      name: "Park Hyatt",
      location: "Sydney, Australia",
      description: "Overlooking the Sydney Opera House, Park Hyatt Sydney is known for its luxury, location, and personalized service.",
      price: 900,
      priceInRupees: 74700,
      rating: 4.7,
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/e4/3c/aa/exterior.jpg?w=900&h=500&s=1'
    }
  ];

  const boutiqueHotelData = [
    {
      name: "The Artist Residence",
      location: "Brighton, UK",
      description: "A creative, bohemian hangout on the seafront, offering eclectic style and a vibrant atmosphere.",
      price: 250,
      priceInRupees: 20750,
      rating: 4.5,
      image: 'https://www.motorverso.com/wp-content/uploads/2017/07/Artist-Residence-Brighton-18.jpg'
    },
    {
      name: "The Giri Residence",
      location: "Ibiza, Spain",
      description: "A luxurious and intimate boutique hotel in a restored farmhouse, offering a private and tranquil hideaway.",
      price: 600,
      priceInRupees: 49800,
      rating: 4.9,
      image: 'https://ksarliving.com/wp-content/uploads/2019/12/GIRI_RESTAURANT11-1612x733.jpg'
    },
    {
      name: "Hotel Saint Cecilia",
      location: "Austin, USA",
      description: "Inspired by music and poetry, this historic hotel offers a lush, secluded oasis with a rock-and-roll soul.",
      price: 700,
      priceInRupees: 58100,
      rating: 4.6,
      image: 'https://login.bunkhousehotels.com/hotel-saint-cecilia/eat-drink/lounge/nick_simonite_hsc_20220615_generalproperty00005'
    },
    {
      name: "The Rose Hotel",
      location: "Venice, USA",
      description: "A historic, bohemian hotel with a rock-and-roll legacy, located just steps from the Venice Beach boardwalk.",
      price: 350,
      priceInRupees: 29050,
      rating: 4.3,
      image: 'https://www.telegraph.co.uk/content/dam/Travel/Destinations/North%20America/USA/California/los%20angeles/the-rose-hotel-venice-california-P.jpg'
    },
    {
      name: "Villa Rosa Kempinski",
      location: "Nairobi, Kenya",
      description: "A five-star hotel offering a perfect fusion of European luxury and vibrant Kenyan hospitality.",
      price: 300,
      priceInRupees: 24900,
      rating: 4.7,
      image: 'https://content.r9cdn.net/rimg/himg/a6/52/22/ice-547332-baae03-343922.jpg?width=1200&height=630&crop=true'
    },
    {
      name: "D.O.M Hotel",
      location: "Rome, Italy",
      description: "An intimate 5-star hotel in a 17th-century palace, blending monastic history with contemporary luxury.",
      price: 500,
      priceInRupees: 41500,
      rating: 4.6,
      image: 'https://www.althoffcollection.com/fileadmin/_processed_/0/3/csm_althoff-dom-hotel-koeln-rendering-nacht__2__cbc8a952a1.jpg'
    },
    {
      name: "The Lokal Hotel",
      location: "Philadelphia, USA",
      description: "An 'invisible service' apartment hotel with stylish suites, offering a local, home-away-from-home experience.",
      price: 280,
      priceInRupees: 23240,
      rating: 4.8,
      image: 'https://staylokal.com/wp-content/uploads/2020/02/lokal-capemay-exterior-l-002.jpg'
    },
    {
      name: "25hours Hotel",
      location: "Zurich, Switzerland",
      description: "A vibrant design hotel inspired by the contrasts of its neighborhood, from banking to nightlife.",
      price: 320,
      priceInRupees: 26560,
      rating: 4.5,
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/7e/85/25/25hours-hotel-langstrasse.jpg?w=900&h=500&s=1'
    },
    {
      name: "The George",
      location: "Christchurch, New Zealand",
      description: "A 5-star luxury boutique hotel offering intimate, opulent service with views of Hagley Park.",
      price: 260,
      priceInRupees: 21580,
      rating: 4.8,
      image: 'https://www.newzealand.com/assets/externally-managed-assets/tbd-assets/tbd-folder-10073362/img-1714081332-9517-3456949-tbd-asset__aWxvdmVrZWxseQo_CropResizeWzE5MDAsMTAwMCw3NSwianBnIl0.jpg'
    },
    {
      name: "Raas",
      location: "Jodhpur, India",
      description: "A stunning blend of an 18th-century haveli and modern design, with breathtaking views of Mehrangarh Fort.",
      price: 400,
      priceInRupees: 33200,
      rating: 4.7,
      image: 'https://cdn.prod.website-files.com/65097d6578d1dcb1e84efa23/6579afc0b922a5b3d4835270_RAAS%20jodhpur%20thumbnail%20landscape.webp'
    }
  ];

  const businessHotelData = [
    {
      name: "JW Marriott",
      location: "Dubai, UAE",
      description: "A luxury business hotel in the heart of Dubai, offering world-class meeting facilities and executive lounges.",
      price: 350,
      priceInRupees: 29050,
      rating: 4.7,
      image: "https://gos3.ibcdn.com/4e38e06ec55711e8a9ed0a8f75160ef6.jpg" // JW Marriott Dubai exterior
    },
    {
      name: "Hilton Garden Inn",
      location: "London, UK",
      description: "A modern business hotel with convenient access to transport, business centers, and on-site dining.",
      price: 200,
      priceInRupees: 16600,
      rating: 4.1,
      image: "https://dayuse.twic.pics/hotels/9313/afbf25fcffbf67806d7b709251b974c2-hilton-garden-inn-london-heathrow-airport.jpeg?twic=v1/cover=3840/quality=75" // Hilton Garden Inn/UK
    },
    {
      name: "Hyatt Regency",
      location: "Sydney, Australia",
      description: "A major 5-star hotel with premium amenities and a central location, ideal for corporate travelers and events.",
      price: 280,
      priceInRupees: 23240,
      rating: 4.4,
      image: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/03/27/1516/Hyatt-Regency-Sydney-P043-Exterior-Dusk.jpg/Hyatt-Regency-Sydney-P043-Exterior-Dusk.16x9.jpg"
    },
    {
      name: "The Oberoi",
      location: "New Delhi, India",
      description: "An iconic luxury hotel blending modern sophistication with classic Indian hospitality, favored by discerning business travelers.",
      price: 350,
      priceInRupees: 29050,
      rating: 4.7,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/44522456.jpg?k=9947bae2627f2fc1ec561c4284d877d0cddcad32a7e4b3716a84a115b29ee8ff&o=&hp=1"
    },
    {
      name: "Sofitel",
      location: "Paris, France",
      description: "Embodies French elegance in the heart of the city, offering refined comfort and premium services for business and leisure.",
      price: 500,
      priceInRupees: 41500,
      rating: 4.5,
      image: "https://www.jet2holidays.com/HotelImages/Web/CDG_73710_Sofitel_Paris_Baltimore_Tour_Eiffel_0222_01.jpg"
    },
    {
      name: "Marriott Marquis",
      location: "New York, USA",
      description: "An iconic hotel in Times Square, offering extensive event spaces and premier amenities for business and tourism.",
      price: 450,
      priceInRupees: 37350,
      rating: 4.2,
      image: "https://cdn.prod.website-files.com/66164ec19113caaa1f66178a/677c24c086123285f0750a9b_Hotel-Marriott-Marquis-exterior-2022.jpeg" // Marriott Marquis/NYC
    },
    {
      name: "Novotel",
      location: "London, UK",
      description: "A contemporary hotel focused on comfort and convenience, with excellent transport links for business travelers.",
      price: 220,
      priceInRupees: 18260,
      rating: 4.0,
      image: "https://www.momondo.in/himg/c8/26/b5/expedia_group-197053-6eb5d0f0-355154.jpg" // Novotel/UK
    },
    {
      name: "InterContinental",
      location: "Hong Kong",
      description: "A world-class luxury hotel with stunning harbor views and comprehensive facilities for international business travelers.",
      price: 400,
      priceInRupees: 33200,
      rating: 4.6,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/1b/44/c0/caption.jpg?w=900&h=-1&s=1" // InterContinental/Hong Kong
    },
    {
      name: "Radisson Blu",
      location: "Berlin, Germany",
      description: "A stylish, modern hotel in a central location, known for its unique design and excellent business facilities.",
      price: 250,
      priceInRupees: 20750,
      rating: 4.3,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/44/c7/d2/radisson-blu-hotel-berlin.jpg?w=900&h=500&s=1" // Radisson Blu/Berlin
    },
    {
      name: "Crowne Plaza",
      location: "New York, USA",
      description: "A major hub in Times Square, providing comprehensive amenities and a prime location for business and tourism.",
      price: 380,
      priceInRupees: 31540,
      rating: 4.0,
      image: "https://www.new-york-hotels-list.com/data/Pictures/OriginalPhoto/3595/359585/359585173/picture-new-york-crowne-plaza-times-square-manhattan-hotel-36.JPEG" // Crowne Plaza/NYC
    }
  ];

  const allInclusiveResortData = [
    {
      name: "Iberostar Grand Paraiso",
      location: "Playa Paraiso, Mexico",
      description: "A luxurious, adults-only, all-inclusive resort with opulent, Roman-inspired architecture and personalized butler service.",
      price: 600,
      priceInRupees: 49800,
      rating: 4.7,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/61/26/41/iberostar-grand-paraiso.jpg?w=900&h=500&s=1" // Iberostar Grand Paraiso/representative
    },
    {
      name: "Secrets Maroma Beach",
      location: "Playa del Carmen, Mexico",
      description: "A AAA Five Diamond, adults-only resort on a famous beach, offering gourmet dining, top-shelf spirits, and 24-hour room service.",
      price: 700,
      priceInRupees: 58100,
      rating: 4.6,
      image: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2021/10/20/1606/SEMRC-P0001-Aerial-Pools.jpg/SEMRC-P0001-Aerial-Pools.16x9.jpg" // Secrets Maroma Beach/representative
    },
    {
      name: "Hyatt Ziva",
      location: "Cap Cana, Dominican Republic",
      description: "A family-friendly all-inclusive resort in an exclusive community with a water park, multiple pools, and extensive dining options.",
      price: 800,
      priceInRupees: 66400,
      rating: 4.8,
      image: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2019/12/13/1125/Hyatt-Ziva-Cap-Cana-P021-Aerial-Resort.jpg/Hyatt-Ziva-Cap-Cana-P021-Aerial-Resort.16x9.jpg?imwidth=1920" // Hyatt Ziva/representative
    },
    {
      name: "Excellence",
      location: "Playa Mujeres, Mexico",
      description: "An elegant, adults-only resort in a private community, known for its tranquil beach, seven pools, and high-end spa.",
      price: 650,
      priceInRupees: 53950,
      rating: 4.7,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/88/2e/42/excellence-riviera-cancun.jpg?w=900&h=500&s=1" // Excellence Playa Mujeres/representative
    },
    {
      name: "Le Blanc",
      location: "Cancun, Mexico",
      description: "A chic, sophisticated adults-only resort in the Hotel Zone, renowned for its pampering service, butlers, and world-class spa.",
      price: 900,
      priceInRupees: 74700,
      rating: 4.9,
      image: "https://www.palaceresorts.com/le_blanc_cancun_palace_resorts_76aad7afeb_5bd1234a47.webp" // Le Blanc Cancun/representative
    },
    {
      name: "Grand Velas",
      location: "Riviera Maya, Mexico",
      description: "A AAA Five Diamond resort with distinct family-friendly and adults-only sections, offering gourmet dining and a world-class spa.",
      price: 1200,
      priceInRupees: 99600,
      rating: 4.9,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/182628613.jpg?k=30dcc31c59294b64621830128f83d7cf09a29c86ba51edcda15a92216537dd0d&o=&hp=1" // Grand Velas/representative
    },
    {
      name: "Hotel Xcaret Arte",
      location: "Playa del Carmen, Mexico",
      description: "An adults-only resort celebrating Mexican art, with access to all Xcaret parks and unique, artist-led workshops.",
      price: 1000,
      priceInRupees: 83000,
      rating: 4.8,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/fe/c7/06/hotel-xcaret-arte.jpg?w=900&h=-1&s=1" // Hotel Xcaret Arte/representative
    },
    {
      name: "The Caves",
      location: "Negril, Jamaica",
      description: "An intimate, adults-only resort with handcrafted cliffside cottages and private cave dining experiences.",
      price: 550,
      priceInRupees: 45650,
      rating: 4.8,
      image: "https://media.cntraveler.com/photos/580682956f39a9b41381a23c/16:9/w_2560%2Cc_limit/Exterior2-TheCaves-Jamaica-CRHotel.jpg" // The Caves/Negril/representative
    },
    {
      name: "Jade Mountain",
      location: "Soufriere, St. Lucia",
      description: "A unique adults-only resort with three-walled 'sanctuaries' offering private infinity pools and stunning Piton views.",
      price: 1800,
      priceInRupees: 149400,
      rating: 4.9,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/3b/fc/2f/jade-mountain-resort.jpg?w=900&h=500&s=1" // Jade Mountain/representative
    },
    {
      name: "The Brando",
      location: "Tetiaroa, French Polynesia",
      description: "An exclusive private island resort focused on sustainable luxury, with all-inclusive villas, each with its own pool.",
      price: 3500,
      priceInRupees: 290500,
      rating: 5.0,
      image: "https://www.rw-luxuryhotels.com/wp-content/uploads/2015/12/The_brando_RW_Luxury_Hotels__Resorts__Restaurant-BeachDining-twilight-1-1640x830-1200x482.jpg" // The Brando/representative
    }
  ];

  const budgetHotelData = [
    {
      name: "Ibis Budget",
      location: "London, UK",
      description: "A super-economy hotel brand providing essential comfort at a minimal cost with a no-frills approach.",
      price: 90,
      priceInRupees: 7470,
      rating: 3.8,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/d9/d1/89/hotel-ibis-budget-london.jpg?w=900&h=500&s=1" // Ibis Budget exterior/brand
    },
    {
      name: "OYO Rooms",
      location: "New Delhi, India",
      description: "A technology-driven network of budget hotels offering standardized amenities and affordable, reliable accommodation.",
      price: 30,
      priceInRupees: 2490,
      rating: 3.5,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/f4/31/ae/the-outside-facade-of.jpg?w=900&h=500&s=1" // OYO/India hotel room
    },
    {
      name: "easyHotel",
      location: "Glasgow, UK",
      description: "A 'super budget' chain with very small, compact rooms in central locations, offering a pay-for-what-you-use model for amenities.",
      price: 70,
      priceInRupees: 5810,
      rating: 3.6,
      image: "https://www.easyhotel.com/cdn-cgi/image/width=1200,height=800,format=auto/https://easyhotel-prod-easyhotel-strapi.s3.eu-west-2.amazonaws.com/1_easy_Hotel_Glasgow_cbe2d7c0b0.png" // easyHotel/compact room
    },
    {
      name: "Tune Hotels",
      location: "Kuala Lumpur, Malaysia",
      description: "A limited-service hotel with a 'pay-as-you-use' concept for amenities like A/C and Wi-Fi, offering a 5-star sleep at a 1-star price.",
      price: 40,
      priceInRupees: 3320,
      rating: 3.9,
      image: "https://tune.hotels-kualalumpur.com/data/Photos/OriginalPhoto/7064/706416/706416055.JPEG" // Tune Hotels/room
    },
    {
      name: "HotelF1",
      location: "Paris, France",
      description: "A low-cost hotel brand in France, providing basic, affordable roadside accommodation with shared bathroom facilities.",
      price: 60,
      priceInRupees: 4980,
      rating: 3.4,
      image: "https://pix10.agoda.net/hotelImages/2297318/0/deca3656d1c2c2b6fd3e7a93652bb0da.jpg?ca=9&ce=1&s=414x232&ar=16x9" // HotelF1/roadside hotel
    },
    {
      name: "Red Planet Hotels",
      location: "Manila, Philippines",
      description: "A pan-Asian value hotel company focused on core essentials like power showers, upscale beds, and free high-speed Wi-Fi.",
      price: 50,
      priceInRupees: 4150,
      rating: 4.0,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/130337272.jpg?k=8f80fb5e1ccda2f2c6299c8511f3216bee740c174e7c9721ca59229fccb06eb2&o=&hp=1" // Red Planet/modern hotel
    },
    {
      name: "Capsule Inn",
      location: "Osaka, Japan",
      description: "The original capsule hotel concept, offering small, bed-sized pods for cheap, basic overnight accommodation for individual travelers.",
      price: 35,
      priceInRupees: 2905,
      rating: 3.7,
      image: "https://www.explore.com/img/gallery/what-you-need-to-know-about-staying-in-a-micro-hotel/capsule-or-pod-hotels-give-you-a-bargain-price-for-a-place-to-sleep-1673186597.jpg" // Capsule hotel pod
    },
    {
      name: "Zostel",
      location: "Manali, India",
      description: "India's largest chain of backpacker hostels, known for a vibrant, social atmosphere and budget-friendly dorms and private rooms.",
      price: 20,
      priceInRupees: 1660,
      rating: 4.3,
      image: "https://media-cdn.tripadvisor.com/media/photo-s/2a/a1/34/44/zostel-manali-old-manali.jpg" // Zostel Old Manali official
    },
    {
      name: "Super 8",
      location: "Lafayette, USA",
      description: "The world's largest budget hotel chain, providing dependable, no-frills roadside accommodation with free breakfast and Wi-Fi.",
      price: 80,
      priceInRupees: 6640,
      rating: 3.2,
      image: "https://www.wyndhamhotels.com/content/dam/property-images/en-us/se/us/la/duson/12294/12294_exterior_day_1.jpg?downsize=720:*" // Super 8/roadside motel
    },
    {
      name: "Treebo Hotels",
      location: "Bangalore, India",
      description: "A technology-enabled chain of budget hotels in India offering a standardized, quality experience at an affordable price.",
      price: 35,
      priceInRupees: 2905,
      rating: 4.1,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/411668693.jpg?k=2237b940872693af562f5730ee57e5d956130d4d3952413ab3b7891d9d9db516&o=&hp=1" // Treebo/India hotel room
    }
  ];

  const heritageHotelData = [
    {
      name: "Rambagh Palace",
      location: "Jaipur, India",
      description: "A former royal residence, this luxurious palace hotel offers a glimpse into the opulent lifestyle of Indian royalty.",
      price: 440,
      priceInRupees: 36520,
      rating: 4.8,
      amenities: ['Spa', 'Pool', 'Golf Course', 'Restaurant'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/ec/03/e0/facade-of-rambagh-palace.jpg?w=900&h=500&s=1'
    },
    {
      name: "Raffles Hotel",
      location: "Singapore",
      description: "An iconic colonial-style hotel, famous for its historic charm and as the birthplace of the Singapore Sling.",
      price: 885,
      priceInRupees: 73455,
      rating: 4.8,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Bar'],
      image: 'https://stories.forbestravelguide.com/wp-content/uploads/2023/03/HERO-RafflesHotelSingapore-CreditRafflesHotelSingapore.jpg'
    },
    {
      name: "Parador de Granada",
      location: "Granada, Spain",
      description: "A unique hotel within the Alhambra palace grounds, housed in a 15th-century convent with stunning gardens.",
      price: 550,
      priceInRupees: 45650,
      rating: 4.2,
      amenities: ['Restaurant', 'Gardens', 'Bar', 'Free WiFi'],
      image: 'https://paradores.es/sites/default/files/images/Granada_Slide.jpg'
    },
    {
      name: "Neemrana Fort-Palace",
      location: "Neemrana, India",
      description: "A 15th-century fort-palace built into the Aravalli hills, offering a unique heritage experience with tiered levels.",
      price: 150,
      priceInRupees: 12450,
      rating: 4.5,
      amenities: ['Pool', 'Spa', 'Restaurant', 'Vintage Car Rides'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/66/33/f8/sunset-view-from-neemrana.jpg?w=900&h=-1&s=1'
    },
    {
      name: "Fairmont Le Château Frontenac",
      location: "Quebec City, Canada",
      description: "A landmark hotel and UNESCO World Heritage site, offering breathtaking views of the St. Lawrence River.",
      price: 450,
      priceInRupees: 37350,
      rating: 4.8,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Gym'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/89/03/53/caption.jpg?w=900&h=-1&s=1'
    },
    {
      name: "The Shelbourne",
      location: "Dublin, Ireland",
      description: "A historic 5-star hotel overlooking St. Stephen's Green, operating since 1824 with timeless elegance.",
      price: 500,
      priceInRupees: 41500,
      rating: 4.3,
      amenities: ['Spa', 'Health Club', 'Restaurant', 'Bar'],
      image: 'https://assets.cantrellcrowley.com/wp-content/uploads/2016/03/03143320/01-7.jpg'
    },
    {
      name: "Gritti Palace",
      location: "Venice, Italy",
      description: "A 16th-century noble residence on the Grand Canal, offering Venetian splendor and luxurious accommodations.",
      price: 1500,
      priceInRupees: 124500,
      rating: 4.8,
      amenities: ['Spa', 'Restaurant', 'Bar', 'Free WiFi'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/06/bc/d4/the-gritti-palace-a-luxury.jpg?w=900&h=500&s=1'
    },
    {
      name: "Palacio Duhau - Park Hyatt",
      location: "Buenos Aires, Argentina",
      description: "A luxurious hotel combining a restored 1930s palace with a contemporary tower, featuring beautiful gardens.",
      price: 700,
      priceInRupees: 58100,
      rating: 4.9,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Art Gallery'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/38/95/a8/palacio-duhau-park-hyatt.jpg?w=900&h=-1&s=1'
    },
    {
      name: "Umaid Bhawan Palace",
      location: "Jodhpur, India",
      description: "One of the world's largest private residences, offering guests a taste of royal living in a stunning palace.",
      price: 800,
      priceInRupees: 66400,
      rating: 4.9,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Museum'],
      image: 'https://api.blessingsonthenet.com/uploads/hotels/b5920f9c11b231aeb19abe4787d0e40a-1691504046883-Umaid%20Bhawan%20Palace,%20Jodhpur.webp'
    },
    {
      name: "Pestana Palace Lisboa",
      location: "Lisbon, Portugal",
      description: "A restored 19th-century palace and national monument, surrounded by lush private gardens.",
      price: 400,
      priceInRupees: 33200,
      rating: 4.7,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Gardens'],
      image: 'https://www.pestanapalacelisbon.com/images/rotator/hotel/palacehotel05.jpg'
    }
  ];

  const beachResortData = [
    {
      name: "Soneva Fushi",
      location: "Maldives",
      description: "A luxury 'barefoot' resort on a private island, known for its eco-friendly villas, exceptional service, and commitment to sustainability.",
      price: 1800,
      priceInRupees: 149400,
      rating: 4.9,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Private Beach', 'Eco-Friendly'],
      image: 'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2022/06/review-soneva-fushi-maldives.jpg?fit=1280%2C720&ssl=1'
    },
    {
      name: "Atlantis The Palm",
      location: "Dubai, UAE",
      description: "An iconic, ocean-themed entertainment resort with a world-renowned waterpark, aquarium, and celebrity chef restaurants.",
      price: 500,
      priceInRupees: 41500,
      rating: 4.6,
      amenities: ['Waterpark', 'Aquarium', 'Restaurant', 'Pool', 'Beach Club'],
      image: 'https://images.pexels.com/photos/8319454/pexels-photo-8319454.jpeg'
    },
    {
      name: "Taj Exotica Resort & Spa",
      location: "Maldives",
      description: "A 5-star luxury resort featuring private villas, a wellness spa, and PADI-certified diving in a romantic, picturesque setting.",
      price: 1100,
      priceInRupees: 91300,
      rating: 4.8,
      amenities: ['Spa', 'Diving', 'Restaurant', 'Private Villas', 'Pool'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/64/e1/6d/taj-exotica-resort-spa.jpg?w=900&h=500&s=1'
    },
    {
      name: "Four Seasons Resort Maui at Wailea",
      location: "Maui, USA",
      description: "A luxury beachfront resort with spacious rooms, multiple pools including an adults-only infinity pool, and no resort fee.",
      price: 1200,
      priceInRupees: 99600,
      rating: 4.9,
      amenities: ['Pool', 'Spa', 'Restaurant', 'Beachfront', 'No Resort Fee'],
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/275628657.jpg?k=d966b8e6e82a00098e73ab996c2fff1b94c4fd77062247a5776b54a2f962e3ab&o=&hp=1'
    },
    {
      name: "Banyan Tree Phuket",
      location: "Phuket, Thailand",
      description: "An all-pool villa resort renowned for its award-winning spa, multiple dining options, and focus on wellness and romance.",
      price: 550,
      priceInRupees: 45650,
      rating: 4.7,
      amenities: ['Spa', 'Pool Villas', 'Restaurant', 'Golf Course', 'Wellness'],
      image: 'https://www.ahstatic.com/photos/b1u8_ho_03_p_1024x768.jpg'
    },
    {
      name: "Maroma, A Belmond Hotel",
      location: "Riviera Maya, Mexico",
      description: "A tranquil luxury resort on a private beach, emphasizing Mayan culture with a world-class spa and exceptional service.",
      price: 1400,
      priceInRupees: 116200,
      rating: 4.9,
      amenities: ['Spa', 'Private Beach', 'Restaurant', 'Wellness', 'Pool'],
      image: 'https://img.belmond.com/video/upload/so_0/v1709812596/videos/MAR/mar-accmmodation-ssv-loop01.jpg'
    },
    {
      name: "The Oberoi Beach Resort, Bali",
      location: "Bali, Indonesia",
      description: "A 5-star hotel in traditional Balinese style, set in tropical gardens with direct beach access, a beachfront pool, and a renowned spa.",
      price: 450,
      priceInRupees: 37350,
      rating: 4.8,
      amenities: ['Spa', 'Pool', 'Beachfront', 'Restaurant', 'Villas'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/05/2c/c1/main-pool.jpg?w=900&h=500&s=1'
    },
    {
      name: "Trou aux Biches Beachcomber",
      location: "Mauritius",
      description: "An eco-friendly resort known for its romantic atmosphere, stunning sunsets, six restaurants, and a large spa.",
      price: 400,
      priceInRupees: 33200,
      rating: 4.7,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Golf', 'Water Sports'],
      image: 'https://images.trvl-media.com/lodging/3000000/2230000/2229400/2229350/f32d5667.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill'
    },
    {
      name: "One&Only Le Saint Géran",
      location: "Mauritius",
      description: "An iconic luxury resort on a private peninsula, featuring a Guerlain Spa, a 9-hole golf course, and world-class service.",
      price: 850,
      priceInRupees: 70550,
      rating: 4.9,
      amenities: ['Spa', 'Golf', 'Private Peninsula', 'Restaurant', 'Water Sports'],
      image: 'https://assets.kerzner.com/api/public/content/40da4ed6f20f4c6cb53da03a721870aa?v=fa05a8ff&t=w2880'
    },
    {
      name: "Kempinski Hotel Cancun",
      location: "Cancun, Mexico",
      description: "A AAA Five Diamond resort with elegant rooms, a full-service spa, seven restaurants, and two outdoor pools on a prime beachfront.",
      price: 650,
      priceInRupees: 53950,
      rating: 4.8,
      amenities: ['Spa', 'Pool', 'Restaurant', 'Beachfront', 'Tennis'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/cf/aa/b9/nestled-on-a-powdery.jpg?w=900&h=-1&s=1'
    }
  ];

  const mountainResortData = [
    {
      name: "Badrutt's Palace",
      location: "St. Moritz, Switzerland",
      description: "A historic and iconic landmark in St. Moritz, offering legendary service, elegant rooms, and unrivaled views of the Swiss Alps.",
      price: 2200,
      priceInRupees: 182600,
      rating: 4.8,
      amenities: ['Spa', 'Skiing', 'Fine Dining', 'Pool', 'Butler Service'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/3b/f3/c8/badrutt-s-palace-hotel.jpg?w=900&h=500&s=1'
    },
    {
      name: "Wildflower Hall",
      location: "Shimla, India",
      description: "A luxurious Oberoi resort in the Himalayas, the former residence of Lord Kitchener, offering spectacular mountain views, a spa, and outdoor activities.",
      price: 500,
      priceInRupees: 41500,
      rating: 4.8,
      amenities: ['Spa', 'Pool', 'Trekking', 'Restaurant', 'Mountain Views'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/dd/51/cc/wildflower-hall-shimla.jpg?w=900&h=500&s=1'
    },
    {
      name: "The Lodge",
      location: "Verbier, Switzerland",
      description: "Sir Richard Branson's exclusive mountain chalet, offering a highly tailored and luxurious all-inclusive experience for both winter and summer.",
      price: 8000,
      priceInRupees: 664000,
      rating: 5.0,
      amenities: ['Spa', 'Indoor Pool', 'Jacuzzi', 'Private Chef', 'Ski-in/Ski-out'],
      image: 'https://robbreport.com/wp-content/uploads/2013/06/1344271.jpg?w=1000'
    },
    {
      name: "Fairmont Banff Springs",
      location: "Banff, AB, Canada",
      description: "Known as the 'Castle in the Rockies,' this historic UNESCO World Heritage site offers a championship golf course, a world-class spa, and year-round activities.",
      price: 700,
      priceInRupees: 58100,
      rating: 4.8,
      amenities: ['Golf', 'Spa', 'Skiing', 'Multiple Restaurants', 'Pool'],
      image: 'https://www.fivestaralliance.com/files/fivestaralliance.com/field/image/nodes/2009/10263/10263_0_fairmontbanffsprings_fsa-g.jpg'
    },
    {
      name: "The Chedi Andermatt",
      location: "Andermatt, Switzerland",
      description: "A 5-star luxury hotel in the Swiss Alps blending Alpine and Asian design, featuring Michelin-starred dining and a world-class spa.",
      price: 1800,
      priceInRupees: 149400,
      rating: 4.8,
      amenities: ['Spa', 'Michelin Dining', 'Skiing', 'Pool', 'Wine Cellar'],
      image: 'https://www.ghmhotels.com/wp-content/uploads/Chedi-andermatt1.jpg'
    },
    {
      name: "The Khyber Himalayan Resort & Spa",
      location: "Gulmarg, India",
      description: "A luxury ski resort at 8,825 feet, near the world's highest ski lift, offering stunning Himalayan views and a L'Occitane spa.",
      price: 350,
      priceInRupees: 29050,
      rating: 4.7,
      amenities: ['Skiing', 'Spa', 'Pool', 'Gondola Access', 'Restaurant'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/83/ea/61/the-khyber-himalayan.jpg?w=900&h=-1&s=1'
    },
    {
      name: "Amangani",
      location: "Jackson Hole, WY, USA",
      description: "An exclusive, top-rated luxury resort with a minimalist Western design and panoramic Teton views. Currently closed for refurbishment.",
      price: 3000,
      priceInRupees: 249000,
      rating: 4.9,
      amenities: ['Spa', 'Skiing', 'Pool', 'Fine Dining', 'Mountain Views'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3b/40/85/amangani-exterior.jpg?w=900&h=500&s=1'
    },
    {
      name: "COMO Uma Paro",
      location: "Paro, Bhutan",
      description: "A 5-star luxury resort focused on wellness and culture, featuring a COMO Shambhala spa and guided Himalayan experiences.",
      price: 450,
      priceInRupees: 37350,
      rating: 4.9,
      amenities: ['Wellness Center', 'Spa', 'Yoga', 'Guided Treks', 'Organic Restaurant'],
      image: 'https://media.privateupgrades.com/_data/default-hotel_image/13/66680/como-uma-paro-bhutan-10_1400x1400_auto.jpg'
    },
    {
      name: "The Little Nell",
      location: "Aspen, CO, USA",
      description: "An exceptional, five-star/diamond, ski-in/ski-out hotel in Aspen with luxurious amenities and direct mountain access.",
      price: 2500,
      priceInRupees: 207500,
      rating: 4.9,
      amenities: ['Ski-in/Ski-out', 'Spa', 'Fine Dining', 'Pool', 'Wine Cellar'],
      image: 'https://apioairuxm.cloudimg.io/width/1500/foil1/https://www.skiworld.co.uk/images/uploads/photos/large/hotel-the-little-nell-ext-pool_3261.jpg'
    },
    {
      name: "Six Senses Bhutan",
      location: "Bhutan",
      description: "A unique circuit of five distinct luxury lodges across Bhutan's valleys, offering immersive wellness and cultural journeys.",
      price: 1500,
      priceInRupees: 124500,
      rating: 5.0,
      amenities: ['Multi-Lodge Experience', 'Spa', 'Wellness Programs', 'Cultural Immersion', 'Sustainable'],
      image: 'https://media.assettype.com/outlooktraveller%2Fimport%2Foutlooktraveller%2Fpublic%2Fuploads%2Farticles%2Fstays%2F2016%2F12%2FSix-Senses-Bhutan-featured-inage.jpg?w=480&auto=format%2Ccompress&fit=max'
    }
  ];

  const spaAndWellnessResortData = [
    {
      name: "Ananda in the Himalayas",
      location: "Uttarakhand, India",
      description: "A world-renowned luxury spa in the Himalayan foothills, focusing on Ayurveda, Yoga, and Vedanta in a Maharaja's palace estate.",
      price: 825,
      priceInRupees: 68475,
      rating: 5.0,
      amenities: ['Ayurveda', 'Yoga', 'Spa', 'Meditation', 'Healthy Cuisine'],
      image: 'https://assets.architecturaldigest.in/photos/6440fb5edfce010349530344/16:9/w_2560%2Cc_limit/Untitled%2520design%2520(15).png'
    },
    {
      name: "SHA Wellness Clinic",
      location: "Alicante, Spain",
      description: "A leading medical spa combining Western medicine and natural therapies with a focus on personalized health and longevity.",
      price: 1500,
      priceInRupees: 124500,
      rating: 5.0,
      amenities: ['Medical Spa', 'Nutrition', 'Detox', 'Wellness Programs', 'Pool'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/be/f1/b2/exterior-de-sha-en-el.jpg?w=900&h=-1&s=1'
    },
    {
      name: "Kamalaya",
      location: "Koh Samui, Thailand",
      description: "A holistic wellness sanctuary built around a monk's cave, blending Eastern healing with Western medical research.",
      price: 600,
      priceInRupees: 49800,
      rating: 4.9,
      amenities: ['Holistic Healing', 'Yoga', 'Detox', 'Spa', 'Nature Setting'],
      image: 'https://www.top25hotels.com/media/img/2024/04/world-best-luxury-hotels-kamalaya-koh-samui-top25hotels.jpg'
    },
    {
      name: "Como Shambhala",
      location: "Bali, Indonesia",
      description: "A residential health retreat offering holistic wellness programs with resident experts including a yoga teacher and Ayurvedic doctor.",
      price: 1100,
      priceInRupees: 91300,
      rating: 5.0,
      amenities: ['Yoga', 'Ayurveda', 'Spa', 'Healthy Cuisine', 'Pool'],
      image: 'https://de87ve0y4m3tc.cloudfront.net/comohotels.com-2459770069/cms/cache/v2/67071c080e391.jpg/1772x1180/fit/80/bf34aad2d637b9543abfbc651a74f337.jpg'
    },
    {
      name: "Vana Wellness",
      location: "Dehradun, India",
      description: "An all-inclusive wellness retreat integrating Ayurveda, Yoga, and Tibetan Medicine in a serene forest setting.",
      price: 750,
      priceInRupees: 62250,
      rating: 5.0,
      amenities: ['Ayurveda', 'Yoga', 'Tibetan Medicine', 'All-Inclusive', 'Spa'],
      image: 'https://destinationdeluxe.com/wp-content/uploads/2019/10/Vana-Rejuvenate-Nature-Destination-Deluxe.jpg'
    },
    {
      name: "The Ranch Malibu",
      location: "California, USA",
      description: "An immersive fitness and wellness retreat with structured programs of hiking, fitness classes, and plant-based cuisine.",
      price: 1200,
      priceInRupees: 99600,
      rating: 5.0,
      amenities: ['Fitness Programs', 'Hiking', 'Organic Cuisine', 'Spa', 'Pool'],
      image: 'https://media.cntraveler.com/photos/6150d5a15c1845481251501d/16:9/w_2560,c_limit/Pool-RanchatLiveOak-Malibu-CRHotel.jpg'
    },
    {
      name: "Chiva-Som",
      location: "Hua Hin, Thailand",
      description: "A pioneering beachfront destination spa offering a holistic approach with personalized retreats and a wide range of wellness activities.",
      price: 1000,
      priceInRupees: 83000,
      rating: 4.9,
      amenities: ['Destination Spa', 'Holistic Health', 'Beachfront', 'Wellness Cuisine', 'Fitness'],
      image: 'https://www.chivasom.com/wp-content/uploads/2024/07/Chiva-Som-Beachfront-Drone.webp'
    },
    {
      name: "Lefay Resort",
      location: "Gargnano, Italy",
      description: "A luxury eco-resort on Lake Garda blending Chinese medicine with Western science in its extensive Lefay SPA World.",
      price: 700,
      priceInRupees: 58100,
      rating: 4.9,
      amenities: ['Eco-Resort', 'Wellness Spa', 'Lake View', 'Pools', 'Gourmet Cuisine'],
      image: 'https://www.gardalake.com/content/uploads/2017/12/hotel-lefay-resort-gargnano.jpg'
    },
    {
      name: "Canyon Ranch",
      location: "Tucson, USA",
      description: "A trailblazing integrative wellness resort offering a personalized, evidence-based approach with a team of diverse health experts.",
      price: 1300,
      priceInRupees: 107900,
      rating: 4.9,
      amenities: ['Integrative Wellness', 'Expert Team', 'All-Inclusive', 'Fitness', 'Spa'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/1f/77/b6/exterior.jpg?w=900&h=500&s=1'
    },
    {
      name: "Amanemu",
      location: "Ise-Shima, Japan",
      description: "A ryokan-inspired onsen resort celebrating Japan's hot spring tradition in a serene, minimalist, and natural setting.",
      price: 1800,
      priceInRupees: 149400,
      rating: 5.0,
      amenities: ['Onsen', 'Spa', 'Minimalist Design', 'Nature', 'Fine Dining'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/f6/1e/4a/caption.jpg?w=900&h=500&s=1'
    }
  ];

  const adventureResortData = [
    {
      name: "Mahali Mzuri",
      location: "Olare Motorogi Conservancy, Maasai Mara, Kenya",
      description: "Sir Richard Branson's luxury safari camp offers a front-row seat to the Great Migration, with 12 tented suites, expert-guided game drives, and all-inclusive fine dining.",
      price: 1600,
      priceInRupees: 133000,
      rating: 5.0,
      amenities: ['Safari Drives', 'Spa', 'Infinity Pool', 'Fine Dining', 'Cultural Visits'],
      image: 'https://thevendry.com/cdn-cgi/image/width=3840,quality=75,fit=contain,metadata=none,format=auto/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fuploads.thevendry.co%2F36210%2F1686840023740_Mahali-Mzuri---Outdoor-Seating-Dining-Tent-%25281%2529.jpg'
    },
    {
      name: "Explora Patagonia",
      location: "Torres del Paine National Park, Chile",
      description: "All-inclusive luxury lodge in the heart of Patagonia, offering over 40 guided excursions (hiking, horseback riding, wildlife), spa, and stunning views of the Paine Massif.",
      price: 2000,
      priceInRupees: 166000,
      rating: 4.9,
      amenities: ['Guided Excursions', 'Spa', 'Pool', 'All-Inclusive Dining', 'Horseback Riding'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/0f/82/13/photo0jpg.jpg?w=900&h=-1&s=1'
    },
    {
      name: "Taj Safari Lodge, Kanha (Banjaar Tola)",
      location: "Kanha National Park, Madhya Pradesh, India",
      description: "Two elegant camps with tented suites overlooking the Banjaar River, offering expert-led safaris, nature walks, and cultural experiences.",
      price: 700,
      priceInRupees: 58000,
      rating: 4.8,
      amenities: ['Safari Drives', 'Pool', 'Spa', 'Cultural Experiences', 'Fine Dining'],
      image: 'https://www.tigersafariindia.com/blog/wp-content/uploads/2021/02/banjaar-tola-baihar-balaghat-5-star-hotels.jpg'
    },
    {
      name: "Singita Lebombo Lodge",
      location: "Kruger National Park, South Africa",
      description: "Contemporary glass-walled suites in a private concession, offering exclusive wildlife viewing, spa, pool, and all-inclusive luxury.",
      price: 2200,
      priceInRupees: 182000,
      rating: 5.0,
      amenities: ['Safari Drives', 'Spa', 'Pool', 'Wine Cellar', 'Fitness Center'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/4a/b2/84/singita-lebombo-lodge.jpg?w=900&h=500&s=1'
    },
    {
      name: "Tierra Atacama",
      location: "San Pedro de Atacama, Chile",
      description: "Adventure and spa hotel in the Atacama Desert, offering guided excursions (volcano hikes, salt flats, stargazing), Uma Spa, and all-inclusive dining.",
      price: 1200,
      priceInRupees: 99000,
      rating: 4.8,
      amenities: ['Guided Excursions', 'Spa', 'Pool', 'All-Inclusive Dining', 'Stargazing'],
      image: 'https://www.dconstruccion.cl/wp-content/uploads/2015/10/San_Pedro_20120815-3.jpg'
    },
    {
      name: "Six Senses Zighy Bay",
      location: "Musandam Peninsula, Oman",
      description: "Secluded bay resort with private pool villas, famous for paragliding arrivals, diving, mountain biking, and dhow cruises.",
      price: 1500,
      priceInRupees: 124000,
      rating: 4.9,
      amenities: ['Paragliding', 'Diving', 'Spa', 'Private Pool', 'Dhow Cruises'],
      image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/158801871.jpg?k=7022396810eb0ad3f180d4b9a3f367c1d71d4b19e35b753d9716a504feb9bca4&o=&hp=1'
    },
    {
      name: "Wild Planet Resort",
      location: "Wayanad, Kerala, India",
      description: "Jungle resort set in a rainforest, offering trekking, bird watching, and nature exploration, with upscale cottages and an outdoor pool.",
      price: 150,
      priceInRupees: 12400,
      rating: 4.7,
      amenities: ['Trekking', 'Bird Watching', 'Pool', 'Restaurant', 'Nature Walks'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/16/52/55/wild-planet-jungle-resort.jpg?w=900&h=-1&s=1'
    },
    {
      name: "Inkaterra Reserva Amazonica",
      location: "Madre de Dios River, Peru",
      description: "Eco-luxury lodge in the Amazon rainforest, offering guided excursions (canopy walkways, river tours, wildlife), spa, and cabaña accommodations.",
      price: 500,
      priceInRupees: 41000,
      rating: 4.8,
      amenities: ['Guided Excursions', 'Spa', 'Canopy Walkway', 'River Tours', 'Wildlife Viewing'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/31/56/f0/main-house.jpg?w=900&h=500&s=1'
    },
    {
      name: "Amanwana",
      location: "Moyo Island, Indonesia",
      description: "Exclusive tented camp in a nature reserve, offering marine and jungle adventures, diving, snorkeling, and jungle treks.",
      price: 1200,
      priceInRupees: 99000,
      rating: 4.9,
      amenities: ['Diving', 'Snorkeling', 'Jungle Treks', 'Spa', 'All-Inclusive Dining'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/f0/5a/8d/amanwana.jpg?w=900&h=500&s=1'
    },
    {
      name: "Pachira Lodge",
      location: "Tortuguero, Costa Rica",
      description: "Remote lodge accessible by boat, offering guided canal tours, wildlife spotting, and turtle nesting tours in Tortuguero National Park.",
      price: 350,
      priceInRupees: 29000,
      rating: 4.6,
      amenities: ['Canal Tours', 'Wildlife Spotting', 'Pool', 'Restaurant', 'Turtle Tours'],
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/1a/a6/e1/caption.jpg?w=900&h=500&s=1'
    }
  ];
  const genres = [...HOTEL_GENRES, ...RESORT_GENRES];
  genres.forEach((genre, genreIdx) => {
    for (let i = 0; i < 10; i++) {
      if (genre.type === 'Luxury Hotel') {
        const hotelData = luxuryHotelData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Hotel',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'Boutique Hotel') {
        const hotelData = boutiqueHotelData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Hotel',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'Business Hotel') {
        const hotelData = businessHotelData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Hotel',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'All-Inclusive Resort') {
        const hotelData = allInclusiveResortData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Resort',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'Budget Hotel') {
        const hotelData = budgetHotelData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Hotel',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'Heritage Hotel') {
        const hotelData = heritageHotelData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Hotel',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: hotelData.amenities || AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'Beach Resort') {
        const hotelData = beachResortData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Resort',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: hotelData.amenities || AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'Mountain Resort') {
        const hotelData = mountainResortData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Resort',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: hotelData.amenities || AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'Spa & Wellness Resort') {
        const hotelData = spaAndWellnessResortData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Resort',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: hotelData.amenities || AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else if (genre.type === 'Adventure Resort') {
        const hotelData = adventureResortData[i];
        hotels.push({
          name: hotelData.name,
          type: 'Resort',
          genre: genre.type,
          icon: genre.icon,
          image: hotelData.image,
          location: hotelData.location,
          price_inr: hotelData.priceInRupees,
          price_usd: hotelData.price,
          rating: hotelData.rating,
          description: hotelData.description,
          amenities: hotelData.amenities || AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      } else {
        hotels.push({
          name: hotelNames[genreIdx][i],
          type: genreIdx < 5 ? 'Hotel' : 'Resort',
          genre: genre.type,
          icon: genre.icon,
          image: images[i % images.length],
          location: 'Sample Location',
          price_inr: 10000 + Math.floor(Math.random() * 90000),
          price_usd: 100 + Math.floor(Math.random() * 900),
          rating: (4 + Math.random()).toFixed(1),
          description: 'A wonderful place to stay with excellent service and amenities.',
          amenities: AMENITIES.sort(() => 0.5 - Math.random()).slice(0, 4)
        });
      }
    }
  });
  return hotels;
}

const HOTELS = generateHotels();

const TYPE_TABS = [
  { label: 'All', value: 'All' },
  { label: 'Hotels', value: 'Hotel' },
  { label: 'Resorts', value: 'Resort' },
];

const HOTELS_PER_PAGE = 10;

// Helper to get a fixed randomized list from all genres, distributed from 3 random genres per page, like DestinationsList
function getAllRandomizedPages(hotels, genres, perPage = 10) {
  // Make a copy to avoid mutating original
  const allHotels = [...hotels];
  // Shuffle all hotels
  for (let i = allHotels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allHotels[i], allHotels[j]] = [allHotels[j], allHotels[i]];
  }
  // Group by genre
  const genreMap = {};
  genres.forEach(g => { genreMap[g.type] = []; });
  allHotels.forEach(h => { if (genreMap[h.genre]) genreMap[h.genre].push(h); });
  // Create pages: each page is 3 random genres, distributed, like DestinationsList
  const pages = [];
  let genreKeys = genres.map(g => g.type);
  let total = allHotels.length;
  let used = 0;
  while (used < total) {
    // Pick 3 random genres with remaining hotels
    const availableGenres = genreKeys.filter(g => genreMap[g].length > 0);
    if (availableGenres.length === 0) break;
    const shuffled = [...availableGenres].sort(() => 0.5 - Math.random());
    const pageGenres = shuffled.slice(0, Math.min(3, availableGenres.length));
    // Distribute up to perPage hotels from these genres
    const genreHotelMap = pageGenres.map(g => genreMap[g]);
    // Shuffle each genre's hotels
    genreHotelMap.forEach(arr => arr.sort(() => 0.5 - Math.random()));
    const result = [];
    let i = 0;
    while (result.length < perPage && (genreHotelMap[0]?.length || genreHotelMap[1]?.length || genreHotelMap[2]?.length)) {
      for (let g = 0; g < genreHotelMap.length; g++) {
        if (genreHotelMap[g]?.length && result.length < perPage) {
          result.push(genreHotelMap[g].shift());
          used++;
        }
      }
      i++;
      if (i > 20) break; // safety
    }
    // Shuffle the final result so genres are not grouped
    pages.push(result.sort(() => 0.5 - Math.random()));
  }
  return pages;
}

const HotelsList = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [currentTime, setCurrentTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter genres based on selected type
  const genreList = useMemo(() => selectedType === 'Hotel' ? HOTEL_GENRES : selectedType === 'Resort' ? RESORT_GENRES : ALL_GENRES, [selectedType]);

  // Main hotels filter
  const filteredHotels = useMemo(() => HOTELS.filter(hotel => {
    const matchesType = selectedType === 'All' || hotel.type === selectedType;
    const matchesGenre = selectedGenre === 'All' || hotel.genre === selectedGenre;
    return matchesType && matchesGenre;
  }), [selectedType, selectedGenre]);

  const totalPages = Math.ceil(filteredHotels.length / HOTELS_PER_PAGE);
  const paginatedHotels = filteredHotels.slice((currentPage - 1) * HOTELS_PER_PAGE, currentPage * HOTELS_PER_PAGE);

  // Memoized randomized pages for 'All Genres'
  const randomizedPages = useMemo(() => {
    if (selectedGenre === 'All') {
      return getAllRandomizedPages(HOTELS, genreList, HOTELS_PER_PAGE);
    }
    return [];
  }, [selectedGenre, selectedType, genreList]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, selectedGenre]);

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

  // Decide which hotels to show
  const hotelsToShow = selectedGenre === 'All'
    ? (randomizedPages[currentPage - 1] || [])
    : paginatedHotels;

  // Featured genres for the current page
  const featuredGenres = useMemo(() => {
    if (selectedGenre === 'All' && randomizedPages[currentPage - 1]) {
      // Find genres present on this page
      const genreSet = new Set(hotelsToShow.map(h => h.genre));
      // Map to genre objects for icon
      return genreList.filter(g => genreSet.has(g.type));
    } else if (selectedGenre !== 'All') {
      return genreList.filter(g => g.type === selectedGenre);
    }
    return [];
  }, [selectedGenre, hotelsToShow, genreList, currentPage, randomizedPages]);

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
          <h1 className="destinations-hero-title">Explore Hotels & Resorts</h1>
          <p className="destinations-hero-subtitle">Find your perfect stay by type or genre!</p>
        </div>
      </div>
      <div className="destinations-list-page">
        <h1 className="destinations-list-title">Hotels & Resorts</h1>
        {/* Type Tabs */}
        <div className="genre-filter-bar">
          {TYPE_TABS.map(tab => (
            <button
              key={tab.value}
              className={`genre-filter-btn${selectedType === tab.value ? ' active' : ''}`}
              onClick={() => {
                setSelectedType(tab.value);
                setSelectedGenre('All');
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Genre Filter */}
        <div className="genre-filter-bar">
          <button
            className={`genre-filter-btn${selectedGenre === 'All' ? ' active' : ''}`}
            onClick={() => setSelectedGenre('All')}
          >
            All Genres
          </button>
          {genreList.map(genre => (
            <button
              key={genre.type}
              className={`genre-filter-btn${selectedGenre === genre.type ? ' active' : ''}`}
              onClick={() => setSelectedGenre(genre.type)}
            >
              <span style={{ marginRight: 6 }}>{genre.icon}</span>
              {genre.type}
            </button>
          ))}
        </div>
        {/* Featured Genres Section */}
        <div className="random-genres-section">
          <h2>Featured Genres</h2>
          <div className="random-genres-list">
            {featuredGenres.map(genre => (
              <span className="random-genre-badge" key={genre.type}>
                <span style={{ marginRight: 6 }}>{genre.icon}</span>
                {genre.type}
              </span>
            ))}
          </div>
        </div>
        {/* Horizontal card list */}
        <div className="destinations-horizontal-list">
          {hotelsToShow.length > 0 ? (
            hotelsToShow.map((hotel, idx) => (
              <div key={hotel.name + idx} className="destination-horizontal-card">
                <div className="destination-horizontal-image-wrapper">
                  <img src={hotel.image} alt={hotel.name} className="destination-horizontal-image" />
                </div>
                <div className="destination-horizontal-info">
                  <div className="destination-horizontal-header">
                    <h3>{hotel.name}</h3>
                  </div>
                  <div className="destination-horizontal-rating">
                    <span role="img" aria-label="star">⭐</span> {hotel.rating}
                    <span className="destination-horizontal-genre">
                      <span style={{ marginRight: 4 }}>{hotel.icon}</span>
                      {hotel.genre}
                    </span>
                  </div>
                  <p className="destination-horizontal-desc">{hotel.description}</p>
                  <div className="destination-horizontal-details">
                    <span><strong>Location:</strong> {hotel.location}</span>
                    <span><strong>Price:</strong> ₹{hotel.price_inr.toLocaleString()} / ${hotel.price_usd} per night</span>
                  </div>
                  <div className="destination-horizontal-details">
                    <span><strong>Amenities:</strong> {hotel.amenities.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results-message">No hotels or resorts found for this filter.</p>
          )}
        </div>
        {/* Pagination bar */}
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
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#contact">Contact Us</a>
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

export default HotelsList; 