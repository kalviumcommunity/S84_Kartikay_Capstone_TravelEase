const Event = require('../models/Event');

// GET /api/events?location=Paris
const getEventsByLocation = async (req, res) => {
  const { location } = req.query;

  try {
    const events = await Event.find({
      location: new RegExp(location, 'i'), // case-insensitive match
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// POST /api/events
const addEvent = async (req, res) => {
  const { title, location, date, description } = req.body;

  if (!title || !location || !date || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEvent = new Event({ title, location, date, description });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error.message);
    res.status(500).json({ message: 'Error adding event' });
  }
};

module.exports = {
  getEventsByLocation,
  addEvent,
};
