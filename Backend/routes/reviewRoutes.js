const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsByDestination,
  updateReview,
  deleteReview,
  getReviewByUserAndDestination
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Create a review
router.post('/', protect, createReview);

// ✅ Get reviews for a destination by its name (e.g. /api/reviews/paris)
router.get('/', getReviewsByDestination);

router.get('/user/:userId/destination/:destinationName', getReviewByUserAndDestination);

// Update a review by its ID
router.put('/update/:reviewId', protect, updateReview);

// Delete a review by its ID
router.delete('/delete/:reviewId', protect, deleteReview);

module.exports = router;
