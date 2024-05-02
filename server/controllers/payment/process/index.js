const { 
    Payment
} = require('../../../models');


const processPayment = async (req, res) => {
    try{
        const { 
            userId, 
            amount, 
            paymentMethod,
            status
        } = req.body;

        // Validate amount and status with joi
        const schema = Joi.object({
            amount: Joi.number().required(),
            status: Joi.string().required(),
            paymentMethod: Joi.string().required()
        });


        // Create a new payment
        let payment = await Payment.create({
            user_id: userId,
            amount,
            payment_date: new Date(),
            payment_method: paymentMethod,
            status
        });

        res.status(200).json(payment);
    }
    catch(error){
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    processPayment
};