const express = require('express');
const router = express.Router();

// Multer
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { 
    uploadSingleImage, 
    deleteSingleImage
} = require('../../controllers/image');

const { 
    verifyTokenAdmin, 
} = require('../../middlewares/verifyToken');

router.post('/upload', verifyTokenAdmin, upload.single('image'), uploadSingleImage);

router.delete('/deleteArray', verifyTokenAdmin, deleteSingleImage);

module.exports = router;
