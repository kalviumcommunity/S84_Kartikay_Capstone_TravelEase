const multer = require('multer');

// Configure multer for memory storage (for MongoDB)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
    console.log('File filter processing:', {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype
    });
    
    // Check file type
    if (file.mimetype.startsWith('image/')) {
        console.log('File accepted:', file.originalname);
        cb(null, true);
    } else {
        console.log('File rejected:', file.originalname, 'MIME type:', file.mimetype);
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Single multer configuration for both profile and gallery images
const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit for both
    },
    fileFilter: fileFilter
});

module.exports = {
    uploadProfile: uploadImage,
    uploadGallery: uploadImage
}; 