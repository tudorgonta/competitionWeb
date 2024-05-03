const { 
    Winner
} = require("../../../models");

const getAllWinners = async (req, res) => {
    try {
        const { limit, page } = req.query;

        // Find all winners and sort by date in descending order
        let winners = await Winner.findAll({
            order: [
                ['win_date', 'DESC']
            ],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit)
        });
        res.status(200).json({ winners });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
}

const getWinners = async (req, res) => {
    const { competitionId } = req.params;

    try {
        const { limit, page } = req.query;

        // Find winners of a competition and sort by date in descending order
        let winners = await Winner.findAll({
            where: {
                competition_id: competitionId
            },
            order: [
                ['win_date', 'DESC']
            ],
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit)
        });
        res.status(200).json(winners);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const selectWinners = async (req, res) => {
    try {

        const { competitionId } = req.params;
        /*
         winners = [
            userId,
            prizeDescription
         ]
        */
        const { winners } = req.body;
        
        // Create Winner
        await Winner.bulkCreate(winners.map(winner => {
            return {
                user_id: winner.userId,
                competition_id: competitionId,
                win_date: new Date(),
                prize_description: winner.prizeDescription
            }
        }));

        res.status(200).json({ message: 'Winners selected successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    getAllWinners,
    getWinners,
    selectWinners
};

