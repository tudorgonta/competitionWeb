const express = require('express');
const router = express.Router();

// Controllers
const { 
    userLogin, 
    userRegister, 
    userLogout,
    userPasswordReset,
    generateRefreshToken
} = require('../../../controllers/user/authentication');

// Middleware
const { 
    verifyTokenUser
} = require('../../../middlewares/verifyToken');

// Login
router.post('/login', userLogin);

// Register
router.post('/register', userRegister);

// Logout
router.post('/logout', verifyTokenUser, userLogout);

// Password reset
router.patch('/password-reset', verifyTokenUser, userPasswordReset);

// Get new access token
router.get('/verifyToken', generateRefreshToken);

module.exports = router;