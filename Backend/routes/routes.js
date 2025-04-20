const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

router.post('/', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create user', error });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error });
    }
  });

module.exports = router;
