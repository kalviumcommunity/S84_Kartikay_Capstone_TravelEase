const User = require('../models/User.js');
const UserGallery = require('../models/UserGallery.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const UserProfileImage = require('../models/UserProfileImage');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );
        
        console.log('User login - Full user object:', user);

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getUserDashboard = async (req, res) => {
    try {
        const user = req.user; // Assuming user is added via authentication middleware
        res.status(200).json({
            message: `Welcome back, ${user.name}!`,
            user
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard data.' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Upload profile image (like gallery, one per user)
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const userId = req.user.id;
        // Remove old profile image if exists
        await UserProfileImage.findOneAndDelete({ userId });
        // Save new profile image
        const profileImage = await UserProfileImage.create({
            userId,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                fileName: req.file.originalname
            }
        });
        res.status(201).json({
            message: 'Profile image uploaded successfully',
            image: profileImage
        });
    } catch (error) {
        console.error('Profile image upload error:', error);
        res.status(500).json({ error: 'Failed to upload profile image' });
    }
};

// Delete profile image (like gallery, one per user)
const deleteProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;
        const deleted = await UserProfileImage.findOneAndDelete({ userId });
        if (!deleted) {
            return res.status(404).json({ error: 'Profile image not found' });
        }
        res.status(200).json({ message: 'Profile image deleted successfully' });
    } catch (error) {
        console.error('Delete profile image error:', error);
        res.status(500).json({ error: 'Failed to delete profile image' });
    }
};

// Get profile image (like gallery, one per user)
const getProfileImage = async (req, res) => {
    try {
        const userId = req.params.userId;
        const imageDoc = await UserProfileImage.findOne({ userId });
        if (!imageDoc || !imageDoc.image.data) {
            return res.status(404).json({ error: 'Profile image not found' });
        }
        res.set('Content-Type', imageDoc.image.contentType);
        res.send(imageDoc.image.data);
    } catch (error) {
        console.error('Get profile image error:', error);
        res.status(500).json({ error: 'Failed to get profile image' });
    }
};

// Upload gallery image
const uploadGalleryImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { location, description, tripDate } = req.body;
        const userId = req.user.id;

        console.log('Uploading gallery image for user:', userId);
        console.log('File info:', {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });
        console.log('Location:', location);
        console.log('Description:', description);
        console.log('Trip date:', tripDate);

        const galleryImage = await UserGallery.create({
            userId,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
                fileName: req.file.originalname
            },
            location: location || 'Unknown Location',
            description: description || '',
            tripDate: tripDate || null
        });

        console.log('Gallery image created in MongoDB:', galleryImage._id);

        res.status(201).json({
            message: 'Gallery image uploaded successfully',
            image: galleryImage
        });
    } catch (error) {
        console.error('Gallery image upload error:', error);
        res.status(500).json({ error: 'Failed to upload gallery image' });
    }
};

// Get user gallery
const getUserGallery = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('Getting gallery for user:', userId);
        const gallery = await UserGallery.find({ userId }).sort({ uploadDate: -1 });
        console.log('Found gallery items:', gallery.length);
        console.log('Gallery data:', gallery);

        res.status(200).json({
            gallery
        });
    } catch (error) {
        console.error('Get gallery error:', error);
        res.status(500).json({ error: 'Failed to fetch gallery' });
    }
};

// Delete gallery image
const deleteGalleryImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        const userId = req.user.id;

        const image = await UserGallery.findOne({ _id: imageId, userId });
        
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        // Delete from database (no file system cleanup needed)
        await UserGallery.findByIdAndDelete(imageId);

        console.log('Gallery image deleted from MongoDB:', imageId);

        res.status(200).json({
            message: 'Image deleted successfully'
        });
    } catch (error) {
        console.error('Delete gallery image error:', error);
        res.status(500).json({ error: 'Failed to delete image' });
    }
};

// Get gallery image
const getGalleryImage = async (req, res) => {
    try {
        const { imageId } = req.params;
        
        const image = await UserGallery.findById(imageId);
        
        if (!image || !image.image.data) {
            return res.status(404).json({ error: 'Gallery image not found' });
        }

        res.set('Content-Type', image.image.contentType);
        res.send(image.image.data);
    } catch (error) {
        console.error('Get gallery image error:', error);
        res.status(500).json({ error: 'Failed to get gallery image' });
    }
};

module.exports = {
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
};
