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
const { verifyTokenAdmin } = require("../../../middlewares/verifyToken");

// Get all winners
router.get("/winners/", verifyTokenAdmin, getAllWinners)

// Get winners of a competition
router.get("/:competitionId/winners", verifyTokenAdmin, getWinners);

// Select winners of a competition
router.post("/:competitionId/winners", verifyTokenAdmin, selectWinners);

module.exports = router;
