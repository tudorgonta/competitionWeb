// routes for ticket
const express = require("express");
const router = express.Router();

// Controllers
const {
  getTickets,
  purchaseTickets,
  cancelTicket
} = require("../../../controllers/competition/ticket");

// Middleware
const { 
    verifyTokenUser, 
    verifyTokenAdmin 
} = require("../../../middlewares/verifyToken");

// Get all tickets of a user
router.get("/:userId", verifyTokenUser, getTickets);

// Purchase tickets
router.post("/", verifyTokenUser, purchaseTickets);

// Cancel ticket purchase
router.delete("/:ticketId", verifyTokenAdmin, cancelTicket);

module.exports = router;