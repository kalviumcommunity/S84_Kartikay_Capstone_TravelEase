const Review = require('../models/Review');

// Create a review
const createReview = async (req, res) => {
    try {
      const { destination, rating, comment } = req.body;
  
      const review = new Review({
        user: req.user._id,
        destination,
        rating,
        comment,
      });
  
      await review.save();
      await review.populate('user', 'name');  // Populate the user name field
  
      res.status(201).json(review);  // Return populated review
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// ✅ Get reviews by destination name
const getReviewsByDestination = async (req, res) => {
    try {
      const { destination } = req.query;
  
      if (!destination) {
        return res.status(400).json({ message: 'Destination is required' });
      }
  
      const reviews = await Review.find({ destination }).populate('user', 'name _id');
      console.log('Reviews from DB:', reviews); // Log to check if user is populated
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for this destination' });
      }
  
      res.status(200).json(reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // ✅ Get a single review by user and destination
  const getReviewByUserAndDestination = async (req, res) => {
    try {
      const { userId, destinationName } = req.params;
  
      if (!userId || !destinationName) {
        return res.status(400).json({ message: 'User ID and destination are required' });
      }
  
      const review = await Review.findOne({
        user: userId,
        destination: destinationName, // 🔧 this is the fix
      }).populate('user', 'name _id');
  
      if (!review) {
        return res.status(404).json({ message: 'No review found for this user and destination' });
      }
  
      res.status(200).json(review);
    } catch (err) {
      console.error('Error fetching review:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Update a review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();
    await review.populate('user', 'name'); // Populate user name after update
    res.json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createReview,
  getReviewsByDestination,
  getReviewByUserAndDestination,
  updateReview,
  deleteReview,
};
