/* eslint-disable no-use-before-define */
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const RandomizePath = require('../utils/RandomizePath');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const paths = RandomizePath(file.originalname).fullpath;
        fs.mkdirSync(paths, { recursive: true });
        cb(null, paths);
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploadSingle = multer({
    storage,
    fileFilter(req, file, cb) {
        checkFileType(file, cb);
    },
}).single('image');

const uploadMultiple = multer({
    storage,
    fileFilter(req, file, cb) {
        checkFileType(file, cb);
    },
}).array('image');

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return cb(null, true);
    }
    cb('Error: Images Only !!!');
}
module.exports = { uploadSingle, uploadMultiple };
