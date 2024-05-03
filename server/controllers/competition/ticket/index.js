const { getTokenFromHeader } = require('../../../middlewares/verifyToken');
const {
    Ticket,
    AuditLog
} = require('../../../models');

const jwt = require('jsonwebtoken');

const getTickets = async (req, res) => {
    const { userId } = req.params;
    const token = getTokenFromHeader(req);
    // decode token
    const userIdToken = jwt.decode(token).userId;

    if (parseInt(userIdToken) !== parseInt(userId)) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const { limit, page } =  req.query;
        // Find all tickets of a user and sort by purchase_date in descending order
        let tickets = await Ticket.findAll({
            where: {
                user_id: userId
            },
            order: [
                ['purchase_date', 'DESC']
            ],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit)
        });

        res.status(200).json(tickets);
    } catch (error) {
        await AuditLog.create({
            action: 'Get Tickets',
            timestamp: new Date(),
            user_id: userId,
        });
        res.status(500).json({ message: 'Server Error' });
    }
}

const purchaseTickets = async (req, res) => {
    const { userId, competitionId } = req.body;

    try {
        // Create a new ticket
        let ticket = await Ticket.create({
            user_id: userId,
            competition_id: competitionId,
            purchase_date: new Date()
        });

        await AuditLog.create({
            action: 'Purchase Ticket',
            timestamp: new Date(),
            user_id: userId,
        });

        res.status(201).json(ticket);
    } catch (error) {
        await AuditLog.create({
            action: 'Purchase Ticket',
            timestamp: new Date(),
            user_id: userId,
        });
        res.status(500).json({ message: 'Server Error' });
    }
}

const cancelTicket = async (req, res) => {
    const { ticketId } = req.params;

    try {
        // Find the ticket by ticket_id
        let ticket = await Ticket.findByPk(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Delete the ticket
        await ticket.destroy();

        await AuditLog.create({
            action: 'Cancel Ticket',
            timestamp: new Date(),
            user_id: ticket.user_id,
        });

        res.status(200).json({ message: 'Ticket successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    getTickets,
    purchaseTickets,
    cancelTicket
};





