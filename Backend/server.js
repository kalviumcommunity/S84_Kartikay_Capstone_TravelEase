const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tripRoutes = require('./routes/tripRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const destinationRoutes = require('./routes/destinationRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cityRoutes = require('./routes/cityRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
dotenv.config();
require('./config/passport'); // Google OAuth/passport config

const app = express();
const PORT = process.env.PORT || 3000;

// CORS must be set up before routes
app.use(cors({
  origin: ['http://localhost:5173', 'https://kartikay-travelease.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Session and Passport (required for Google OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/trips', tripRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Error handler (should be last)
app.use(errorHandler);

// Health check route
app.get('/', (req, res) => {
  res.send('🌍 TravelEase backend server is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
