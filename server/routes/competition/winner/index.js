// routes for ticket
const express = require("express");
const router = express.Router();

// Controllers
const {
  getWinners,
  selectWinners,
  getAllWinners,
} = require("../../../controllers/competition/winner");

// Middleware
const { 
  verifyTokenAdmin, 
  verifyTokenUser 
} = require("../../../middlewares/verifyToken");

// Get all winners
router.get("/", verifyTokenUser, getAllWinners)

// Get winners of a competition
router.get("/:competitionId", verifyTokenUser, getWinners);

// Select winners of a competition
router.post("/:competitionId", verifyTokenUser, selectWinners);

module.exports = router;
