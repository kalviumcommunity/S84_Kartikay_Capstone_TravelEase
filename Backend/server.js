const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();


const app = express();
const PORT = process.env.PORT;

connectDB();

app.get('/', (req, res) => {
  res.send('🌍 TravelEase backend server is running!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
