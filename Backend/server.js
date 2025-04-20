const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tripRoutes = require('./routes/tripRoutes');


dotenv.config();


const app = express();
const PORT = process.env.PORT;

connectDB();
app.use('/api/trips', tripRoutes);

app.get('/', (req, res) => {
  res.send('🌍 TravelEase backend server is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
