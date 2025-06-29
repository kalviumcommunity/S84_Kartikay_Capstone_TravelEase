const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function() { return !this.googleId; }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // allow multiple nulls
    },
    favorites: [{
        type: String // or ObjectId if you want to reference Destination documents
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;