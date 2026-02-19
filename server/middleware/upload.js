const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Standard upload for images and PDFs
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports images and PDFs!'));
    }
});

// Media upload for Hero section (images + videos)
const heroMediaUpload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB for videos
    fileFilter: function (req, file, cb) {
        const imageTypes = /jpeg|jpg|png|webp/;
        const videoTypes = /mp4|webm|mov/;
        const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
        const mime = file.mimetype;

        if (imageTypes.test(ext) || mime.startsWith('image/')) {
            return cb(null, true);
        }
        if (videoTypes.test(ext) || mime.startsWith('video/')) {
            return cb(null, true);
        }
        cb(new Error('Faqat rasm (jpg, png, webp) yoki video (mp4, webm, mov) yuklash mumkin!'));
    }
});

module.exports = upload;
module.exports.heroMediaUpload = heroMediaUpload;
