const express = require('express');
const router = express.Router();

// Controllers
const { 
    getProfile, 
    updateProfile, 
    deleteProfile 
} = require('../../../controllers/user/profile');

// Middleware
const { 
    verifyTokenUser,
    verifyTokenAdmin
} = require('../../../middlewares/verifyToken');

// Get user profile
router.get('/:userId', verifyTokenUser, getProfile);

// Update user profile
router.put('/:userId', verifyTokenUser, updateProfile);

// Delete user profile
router.delete('/:userId', verifyTokenAdmin, deleteProfile);

module.exports = router;