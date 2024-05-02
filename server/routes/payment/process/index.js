const express = require("express");
const router = express.Router();

// Controllers
const { 
    processPayment
} = require("../../../controllers/payment/process");

// Middleware
const { 
    verifyTokenUser
} = require("../../../middlewares/verifyToken");

// Process payment
router.post("/", verifyTokenUser, processPayment);

module.exports = router;