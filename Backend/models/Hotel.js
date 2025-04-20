const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: [{ type: String }],
  image: { type: String }, // ✅ Added image field
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
