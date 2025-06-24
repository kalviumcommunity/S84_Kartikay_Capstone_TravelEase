const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const hotelSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  location: String,
  amenities: [String]
}, { _id: false });

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  location: String,
  description: String
}, { _id: false });

const attractionSchema = new mongoose.Schema({
  name: String,
  category: String,
  tags: [String]
}, { _id: false });

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  images: [String],
  hotels: [hotelSchema],
  events: [eventSchema],
  attractions: [attractionSchema],
  popularAttractions: [{ type: String }],
  reviews: [reviewSchema]
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;