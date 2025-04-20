const mongoose = require('mongoose')
const tripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: [{ 
        name: { type: String },
        time: { type: String },
        cost: { type: Number }
    }],
    hotel: { 
        name: { type: String },
        price: { type: Number }
    },
    totalBudget: { type: Number },
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;