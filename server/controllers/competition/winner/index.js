const { 
    Winner,
    Ticket
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
        const { 
            competitionId, 
            nrOfWinners,
            prizeDescription
         } = req.body;

        const allTickets = await Ticket.findAll({
            where: { competition_id: competitionId }
        });
        
        // Extract user IDs from participants
        const userIds = allTickets.map(participant => participant.user_id);
        const numberOfWinners = parseInt(nrOfWinners);  // Number of winners needed

        // Pseudo-random generator function using a simple hash
        const pseudoRandomGenerator = (seed, max) => {
            const a = 9301;
            const c = 49297;
            const m = 233280;
            return (a * seed + c) % m % max;
        };

        // Function to select random unique winners
        const selectRandomWinners = (userIds, count) => {
            let winners = [];
            let currentIndex = userIds.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                let timestamp = new Date().getTime();
                randomIndex = pseudoRandomGenerator(timestamp + currentIndex, currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = userIds[currentIndex];
                userIds[currentIndex] = userIds[randomIndex];
                userIds[randomIndex] = temporaryValue;
            }

            // Select the first count elements as winners
            winners = userIds.slice(0, count).map(userId => ({
                userId: userId,
                prizeDescription: prizeDescription
            }));

            return winners;
        };

        // Select winners pseudo-randomly
        const winners = selectRandomWinners(userIds, numberOfWinners);

        // Create Winner entries in the database
        await Winner.bulkCreate(winners.map(winner => {
            return {
                user_id: winner.userId,
                competition_id: competitionId,
                win_date: new Date(),
                prize_description: winner.prizeDescription
            };
        }));

        res.status(200).json({ message: 'Winners selected successfully', winners });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


module.exports = {
    getAllWinners,
    getWinners,
    selectWinners
};

