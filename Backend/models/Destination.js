const mongoose = require('mongoose')
const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    popularAttractions: [{ type: String }],
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;