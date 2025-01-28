import multer from 'multer';

// multer configuration for handling file uploads
const storage = multer.memoryStorage(); // store file in memory buffer
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
});

export const uploadMiddleware = upload.single('imageFile'); // expects field name 'imageFile'
