const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const status = require('http-status');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

function Cloudinary(folderName, fileFieldName) {
    this.storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: `my-instagram/${folderName}`,
            allowedFormats: ['jpg', 'jpeg', 'png', 'WEBP', 'png'],
            transformation: [{ width: 400, height: 400, crop: 'limit' }],
            // filename: (req, file) => file.originalname
        },
    });
    this.upload = multer({ storage: this.storage }).single(fileFieldName);

    this.middleware = (req, res, next) => {
        this.upload(req, res, (err) => {
            if (err) {
                return res
                    .status(status.BAD_REQUEST)
                    .json({ message: 'You must upload an image file' });
            }
            if (!req.file) {
                return res.status(status.BAD_REQUEST).json({
                    message: `${fileFieldName} file is required`,
                });
            }
            next();
        });
    };
}

// eslint-disable-next-line func-names
module.exports = function (folderName, fileFieldName) {
    return new Cloudinary(folderName, fileFieldName);
};
