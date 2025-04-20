const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
          

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id,name: user.name, email: user.email }
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

module.exports = {
    registerUser,
    loginUser,
    getUserDashboard,
    getAllUsers
};
