const mongoose = require('mongoose');

const userProfileImageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Only one profile image per user
    },
    image: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        }
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const UserProfileImage = mongoose.model('UserProfileImage', userProfileImageSchema);
module.exports = UserProfileImage; 