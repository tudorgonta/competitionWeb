const { 
    Profile,
    AuditLog ,
    Role,
    UserRoles
} = require('../../models'); // Assuming index.js exports User and Profile models

// Validation module
const Joi = require('joi');

const getProfile = async (req, res) => {
    try {
        // Extract the user ID from the request
        const userId = req.params.userId;

        // Find the user profile
        const profile = await Profile.findOne({ where: { userId } });
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
            firstName: Joi.string().trim().required(),
            lastName: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().trim().required(),
            address: Joi.string().trim().required(),
            city: Joi.string().trim().required(),
            state: Joi.string().trim().required(),
            country: Joi.string().trim().required(),
            postCode: Joi.string().trim().required()
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

        const profile = await Profile.findOrCreate({
            where: { user_id: userId },
            defaults: { 
                first_name: firstName,  // Adjusted to match column names in model
                last_name: lastName,
                phone_number: phone,
                address: address,
                city: city,
                state: state,
                country: country,
                postal_code: postCode  // Ensure the key names match those in the model
            }
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
            await profile.update(updates);
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