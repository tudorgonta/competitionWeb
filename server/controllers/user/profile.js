const jwt = require('jsonwebtoken');
const { getTokenFromHeader } = require('../../middlewares/verifyToken');
const { 
    Profile,
    AuditLog
} = require('../../models'); // Assuming index.js exports User and Profile models

// Validation module
const Joi = require('joi');

const getProfile = async (req, res) => {
    try {
        // Extract the user ID from the request
        const userId = req.params.userId;

        const token = getTokenFromHeader(req);

        // Check if the user is authorized to view the profile
        const decodedUserId = jwt.decode(token).userId;

        console.log()

        if (parseInt(decodedUserId) !== parseInt(userId)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Find the user profile
        const profile = await Profile.findOne({
            where: { user_id: userId },
            attributes: { exclude: ['refresh_token'] } // Exclude the refresh token from the response for security reasons
        });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Send the profile to the client
        res.status(200).json({ profile });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateProfile = async (req, res) => {
    const userId = req.params.userId;
    const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        address, 
        city, 
        state, 
        country, 
        postCode 
    } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID must be provided' });
    }

    try {
        const schema = Joi.object({
            firstName: Joi.string().min(2).max(100).trim().required(),
            lastName: Joi.string().min(2).max(100).trim().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(2).max(50).trim().required(),
            address: Joi.string().min(2).max(100).trim().required(),
            city: Joi.string().min(2).max(100).trim().required(),
            state: Joi.string().min(2).max(100).trim().required(),
            country: Joi.string().min(2).max(100).trim().required(),
            postCode: Joi.string().min(2).max(100).trim().required()
        });

        const { error } = schema.validate({
            firstName, 
            lastName, 
            email, 
            phone, 
            address, 
            city, 
            state, 
            country, 
            postCode
        });

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const profile = await Profile.update({
            first_name: firstName,  // Adjusted to match column names in model
            last_name: lastName,
            phone_number: phone,
            address: address,
            city: city,
            state: state,
            country: country,
            postal_code: postCode  // Ensure the key names match those in the model
        }, {
            where: { user_id: userId }
        });

        let updatedFields = {};
        // Collect fields that actually have new values different from the current ones

        const updates = {};
        for (let field of ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'country', 'postCode']) {
            if (req.body[field] !== profile[field]) {
                updates[field] = req.body[field];
            }
        }
        // Update the profile with only the changed fields
        if (Object.keys(updates).length > 0) {
            updatedFields = updates;
        } else {
            updatedFields = { message: "No fields updated; submitted data matched existing records." };
        }

        await AuditLog.create({
            action: 'UPDATE Profile',
            userId: userId,
            timestamp: new Date(),
        });

        res.status(200).json({ profileFields: updatedFields });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProfile = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: 'User ID must be provided' });
    }

    try {
        const profile = await Profile.findOne({ where: { user_id: userId } });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        await Profile.destroy({ where: { user_id: userId } });

        await AuditLog.create({
            action: 'DELETE Profile',
            userId: userId,
            timestamp: new Date(),
        });

        res.status(200).json({ message: 'Profile deleted' });

    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
};