const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const status = require('http-status');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

const size = {
    media: {
        width: 750,
        height: 750,
    },
    avatar: {
        width: 300,
        height: 300,
    },
};

function Cloudinary(folderName, fileFieldName) {
    this.storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: `my-instagram/${folderName}`,
            allowedFormats: ['jpg', 'jpeg', 'png', 'WEBP', 'png'],
            transformation: [
                {
                    width: size[fileFieldName].width,
                    height: size[fileFieldName].height,
                    crop: 'limit',
                },
            ],
            // filename: (req, file) => file.originalname
        },
    });
    this.upload = multer({ storage: this.storage }).single(fileFieldName);

    this.middleware = (req, res, next) => {
        this.upload(req, res, (err) => {
            if (err) {
                return res
                    .status(status.BAD_REQUEST)
                    .json({ message: err.message });
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
