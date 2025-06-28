const mongoose = require('mongoose');

const userGallerySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    tripDate: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const UserGallery = mongoose.model('UserGallery', userGallerySchema);
module.exports = UserGallery; 