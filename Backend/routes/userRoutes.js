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
    getGalleryImage
} = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware'); // Middleware for protected routes
const { uploadProfile, uploadGallery } = require('../middleware/uploadMiddleware');
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

module.exports = router;
