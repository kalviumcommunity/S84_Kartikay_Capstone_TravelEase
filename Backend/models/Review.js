const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }, { timestamps: true });
  

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
