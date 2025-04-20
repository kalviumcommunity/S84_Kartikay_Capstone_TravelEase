const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tripRoutes = require('./routes/tripRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const destinationRoutes = require('./routes/destinationRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const eventRoutes = require('./routes/eventRoutes');


dotenv.config();


const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(errorHandler);

connectDB();

app.use('/api/trips', tripRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('🌍 TravelEase backend server is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
