const mongoose = require('mongoose');

const SavedTripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
        },
  destination: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true 
        },
  flightDetails: { type: String,
        required: true
        },
  hotelDetails: { type: String,
         required: true 
        },
  savedAt: { type: Date,
         default: Date.now 
        },
});

const SavedTrip = mongoose.model('SavedTrip', SavedTripSchema);

module.exports = SavedTrip;
