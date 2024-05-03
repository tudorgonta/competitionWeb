const { 
    Competition,
    AuditLog,
} = require('../../../models');
const { getObjectSignedUrl } = require('../../../services/s3');

const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { getTokenFromHeader } = require('../../../middlewares/verifyToken');

const getCompetitions = async (req, res) => {
    try {

        const { limit } = req.query;
        
        let competitions = await Competition.findAll({
            limit: limit ? parseInt(limit) : 10,
            order: [['start_date', 'DESC']]
        });

        // get object signed url of image_url
        for (let i = 0; i < competitions.length; i++) {
            if(!competitions[i].image_url.includes('http')) 
                competitions[i].image_url = await getObjectSignedUrl(competitions[i].image_url);
        }

        res.status(200).json(competitions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getCompetition = async (req, res) => {
    try {
        const { competitionId } = req.params;

        let competition = await Competition.findByPk(competitionId);

        if(!competition) {
            return res.status(404).json({ message: 'Competition not found' });
        }

        // get object signed url of image_url
        if(!competition.image_url.includes('http')) 
            competition.image_url = await getObjectSignedUrl(competition.image_url);

        res.status(200).json(competition);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const createCompetition = async (req, res) => {

    // Get token from header 
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    // Decode token to get user_id
    const userId = jwt.decode(token).userId;

    try {
        const { 
            title, 
            description, 
            start_date, 
            end_date, 
            ticket_price, 
            total_tickets, 
            image_url 
        } = req.body;

        // Validate title, description, start_date, end_date, ticket_price, total_tickets with joi
        const schema = Joi.object({
            title: Joi.string().min(10).max(100).required(),
            description: Joi.string().min(10).max(500).required(),
            start_date: Joi.date().timestamp().required(),
            end_date: Joi.date().timestamp().required(),
            ticket_price: Joi.number().required(),
            total_tickets: Joi.number().required(),
            image_url: Joi.string().required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // format start_date and end_date
        let start_date_formatted = new Date(start_date * 1000);
        let end_date_formatted = new Date(end_date * 1000);

        // Create a new competition
        let competition = await Competition.create({
            title,
            description,
            start_date: start_date_formatted,
            end_date: end_date_formatted,
            ticket_price,
            total_tickets,
            image_url
        });

        // get object signed url of image_url
        if(!competition.image_url.includes('http'))
            competition.image_url = await getObjectSignedUrl(competition.image_url);
        
        await AuditLog.create({
            action: 'CREATE Competition Success',
            userId: userId
        });

        res.status(200).json(competition);
    } catch (error) {
        await AuditLog.create({
            action: 'CREATE Competition Failed',
            userId: userId
        });
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateCompetition = async (req, res) => {
    
    // Get token from header 
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    // Decode token to get user_id
    const userId = jwt.decode(token).userId;

    try {
        const { competitionId } = req.params;

        const { 
            title, 
            description, 
            start_date, 
            end_date, 
            ticket_price, 
            total_tickets, 
            image_url 
        } = req.body;

        // Validate title, description, start_date, end_date, ticket_price, total_tickets with joi
        const schema = Joi.object({
            title: Joi.string().min(10).max(100).required(),
            description: Joi.string().min(10).max(500).required(),
            start_date: Joi.date().timestamp().required(),
            end_date: Joi.date().timestamp().required(),
            ticket_price: Joi.number().required(),
            total_tickets: Joi.number().required(),
            image_url: Joi.string().required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // format start_date and end_date
        let start_date_formatted = new Date(start_date * 1000);
        let end_date_formatted = new Date(end_date * 1000);

        // Update competition
        let competition = await Competition.findByPk(competitionId);

        if(!competition) {
            return res.status(404).json({ message: 'Competition not found' });
        }

        competition.title = title;
        competition.description = description;
        competition.start_date = start_date_formatted;
        competition.end_date = end_date_formatted;
        competition.ticket_price = ticket_price;
        competition.total_tickets = total_tickets;
        competition.image_url = image_url;

        await competition.save();

        await AuditLog.create({
            action: 'UPDATE Competition Success',
            userId: userId
        });

        // get object signed url of image_url
        if(!competition.image_url.includes('http')) 
            competition.image_url = await getObjectSignedUrl(competition.image_url);


        res.status(200).json(competition);
    } catch (error) {
        await AuditLog.create({
            action: 'UPDATE Competition Failed',
            userId: userId
        });
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteCompetition = async (req, res) => {
        
    // Get token from header 
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    // Decode token to get user_id
    const userId = jwt.decode(token).userId;
    
    try {
        const { competitionId } = req.params;

        // Delete competition
        let competition = await Competition.findByPk(competitionId);

        if(!competition) {
            return res.status(404).json({ message: 'Competition not found' });
        }

        await competition.destroy();

        await AuditLog.create({
            action: 'DELETE Competition Success',
            userId: userId
        });

        res.status(200).json({ message: 'Competition deleted' });
    } catch (error) {
        await AuditLog.create({
            action: 'DELETE Competition Failed',
            userId: userId
        });
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    getCompetitions,
    getCompetition,
    createCompetition,
    updateCompetition,
    deleteCompetition
};

