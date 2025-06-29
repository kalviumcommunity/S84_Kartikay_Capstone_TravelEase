const express = require('express');
const { 
    registerUser, 
    loginUser, 
    getUserDashboard, 
    getAllUsers,
    uploadProfileImage,
    deleteProfileImage,
    getProfileImage,
    uploadGalleryImage,
    getUserGallery,
    deleteGalleryImage,
    getGalleryImage,
    getFavorites,
    addFavorite,
    removeFavorite
} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware'); // Middleware for protected routes
const { uploadProfile, uploadGallery } = require('../middleware/uploadMiddleware');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', protect, getUserDashboard);
router.get('/', getAllUsers);

// File upload routes
router.post('/upload-profile-image', protect, uploadProfile.single('profileImage'), uploadProfileImage);
router.delete('/delete-profile-image', protect, deleteProfileImage);
router.get('/profile-image/:userId', getProfileImage);
router.post('/upload-gallery-image', protect, uploadGallery.single('galleryImage'), uploadGalleryImage);
router.get('/gallery', protect, getUserGallery);
router.get('/gallery-image/:imageId', getGalleryImage);
router.delete('/gallery/:imageId', protect, deleteGalleryImage);

// Google OAuth routes
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    async (req, res) => {
        // Successful authentication, issue JWT and redirect or respond
        const user = req.user;
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        // Option 1: Redirect with token as query param (for SPA)
        // res.redirect(`${process.env.CLIENT_URL}/google-auth-success?token=${token}`);
        // Option 2: Respond with token and user info (API style)
        res.status(200).json({
            message: 'Google login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
);

// Google OAuth token endpoint for SPA
router.post('/auth/google/token', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, googleId: sub });
    } else if (!user.googleId) {
      user.googleId = sub;
      await user.save();
    }

    const appToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Google login successful',
      token: appToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

// Favorites routes
router.get('/:userId/favorites', protect, getFavorites);
router.post('/:userId/favorites', protect, addFavorite);
router.delete('/:userId/favorites/:destinationId', protect, removeFavorite);

module.exports = router;
