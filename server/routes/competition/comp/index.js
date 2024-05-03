const express = require('express');
const router = express.Router();

// Controllers
const { 
    getCompetitions, 
    getCompetition, 
    createCompetition, 
    updateCompetition, 
    deleteCompetition
} = require('../../../controllers/competition/comp');

// Middleware
const { 
    verifyTokenAdmin,
    verifyTokenUser
} = require('../../../middlewares/verifyToken');

// Get all competitions
router.get('/', getCompetitions);

// Get competition details
router.get('/:competitionId', getCompetition);

// Create a new competition
router.post('/', verifyTokenAdmin, createCompetition);

// Update competition details
router.put('/:competitionId', verifyTokenAdmin, updateCompetition);

// Delete a competition
router.delete('/:competitionId', verifyTokenAdmin, deleteCompetition);

module.exports = router;