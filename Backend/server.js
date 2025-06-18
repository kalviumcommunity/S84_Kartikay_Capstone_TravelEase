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


dotenv.config();


const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(errorHandler);
app.use(cors({
  origin: ['http://localhost:5173','https://kartikay-travelease.netlify.app'], // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Enable cookies or authentication headers if needed
}));

connectDB();//Mongodb connected

app.use('/api/trips', tripRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('🌍 TravelEase backend server is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
