const express = require('express');
const { registerUser, loginUser , getUserDashboard , getAllUsers} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware'); // Middleware for protected routes
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', protect, getUserDashboard);
router.get('/', getAllUsers);

module.exports = router;
