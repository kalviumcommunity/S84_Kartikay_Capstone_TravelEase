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
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;