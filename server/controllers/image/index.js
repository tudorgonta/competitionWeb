// AWS
const { 
    uploadFile, 
    deleteFile 
} = require('../../services/s3.js')
// Modules
const sharp = require('sharp')
const crypto = require('crypto')
// Models
const { AuditLog } = require('../../models/index.js');

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const uploadSingleImage = async (req, res) => {
    const file = req.file // file passed from client

    if (!file) return res.status(400).json({ message: 'No file uploaded' }) // no file safeguard
    try {
        const imageName = generateFileName(); // generate a unique name for the image

        const fileSize = file.size / 1024; // in kb

        let quality = 80;
        if (fileSize > 1024) {
            quality = 65;
        }
        if (fileSize > 2048) {
            quality = 50;
        }

        const fileBuffer = await sharp(file.buffer)
            .resize({ width: 1920, height: 1080, fit: 'contain' })
            .jpeg({ quality: quality })
            .toBuffer(); // convert the image to buffer

        await uploadFile(fileBuffer, imageName, file.mimetype); // upload the image to S3

        await AuditLog.create({
            action: 'UPLOAD Image Success',
            userId: req.decodedToken.userId,
            timestamp: new Date()
        });
        
        res.status(200).json({ media: imageName }); // send the image name to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' }); // server error
    }
};

const deleteSingleImage = async (req, res) => {
    const { imageName } = req.params; // get the image name from the request

    try {
        await deleteFile(imageName); // delete the image from S3
        await AuditLog.create({
            action: 'DELETE Image Success',
            userId: req.decodedToken.userId,
            timestamp: new Date()
        });
        res.status(200).json({ message: 'Image deleted' }); // send a success message to the client
    } catch (error) {
        await AuditLog.create({
            action: 'DELETE Image Error',
            userId: req.decodedToken.userId,
            timestamp: new Date()
        });
        res.status(500).json({ message: 'Server Error' }); // server error
    }
}

module.exports = {
    uploadSingleImage,
    deleteSingleImage,
}
