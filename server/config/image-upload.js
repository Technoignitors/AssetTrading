const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImageFormats = ['image/jpeg', 'image/png'];
    if (allowedImageFormats.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(new Error('Only pdfs are allowed'))
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports = upload;