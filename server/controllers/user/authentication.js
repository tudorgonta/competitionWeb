const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { 
    User, 
    Profile,
    AuditLog ,
    Role,
    UserRoles
} = require('../../models'); // Assuming index.js exports User and Profile models

// Write a fucntion to generate a new access token using the refresh token
const generateAccessToken = (req, res) => {
    try {
        // Extract the refresh token from the request
        const refreshToken = req.cookies.refreshToken;

        // If no refresh token is provided, return an error
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token not provided' });
        }

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid refresh token' });
            }

            // Check if the refresh token exists in the database
            const profile = await Profile.findOne({ where: { refresh_token: refreshToken } });
            if (!profile) {
                return res.status(403).json({ error: 'Invalid refresh token' });
            }

            // Create a new access token
            const accessToken = jwt.sign({ userId: decodedToken.userId, role: decodedToken.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

            // Send the access token to the client
            res.status(200).json({ token: accessToken });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Route to create a new user
const userRegister = async (req, res) => {
    try {
        // Validate incoming data
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        // Validate data with joi
        const schema = Joi.object({
            username: Joi.string().trim().min(3).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().trim().min(3).required()
        });

        const { error } = schema.validate({ username, email, password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            // Log to AuditLog
            await AuditLog.create({ action: `User registration failed: User with email ${email} already exists`, timestamp: new Date() });
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password with bcrypt
        const saltRounds = process.env.SALT_ROUNDS || 10;
        const salt = bcrypt.genSalt(saltRounds);
        const hashedPassword = bcrypt.hash(password, salt);

        // Create the user
        const newUser = await User.create({ username, email, password_hash: hashedPassword });

        // Create a JWT access token
        const accessToken = jwt.sign({ userId: newUser.user_id, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        // Create a refresh token (stored in cookies)
        const refreshToken = jwt.sign({ userId: newUser.user_id, role: 'user' }, process.env.REFRESH_TOKEN_SECRET);

        // Create profile for the user
        const createdProfile = await Profile.create({ user_id: newUser.user_id });

        // Save the refresh token to the profile entity
        await Profile.update({ refresh_token: refreshToken }, { where: { user_id: newUser.user_id } });

        // Create user role
        const foundRole = await Role.findOne({ where: { role_name: 'user' } });

        // Assign the user role to the user
        await UserRoles.create({ user_id: newUser.user_id, role_id: foundRole.role_id });

        // Log to AuditLog
        await AuditLog.create({ action: `User registration successful: User with email ${email} created`, timestamp: new Date() });

        // Send the refresh token as a cookie
        res.cookie('accessToken', accessToken, { httpOnly: true });

        // Respond with access token
        res.status(200).json({ profile: createdProfile, token: accessToken, role: 'user' });
    } catch (error) {
        console.error('Error:', error);
        // Log to AuditLog
        await AuditLog.create({ action: `User registration failed: ${error.message}`, timestamp: new Date() });
        res.status(500).json({ error: 'Internal server error' });
    }
}

const userLogout = async (req, res) => {
    try {
        // Extract the refresh token from the request
        const refreshToken = req.cookies.refreshToken;

        // If no refresh token is provided, return an error
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token not provided' });
        }

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid refresh token' });
            }

            // Check if the refresh token exists in the database
            const profile = await Profile.findOne({ where: { refresh_token: refreshToken } });
            if (!profile) {
                return res.status(403).json({ error: 'Invalid refresh token' });
            }

            // Remove the refresh token from the profile entity
            await Profile.update({ refresh_token: null }, { where: { user_id: decodedToken.userId } });

            // Log to AuditLog
            await AuditLog.create({ action: `User logout successful: User with ID ${decodedToken.userId} logged out`, timestamp: new Date() });

            // Send a response
            res.status(200).json({ message: 'User logged out' });
        });
    } catch (error) {
        console.error('Error:', error);
        // Log to AuditLog
        await AuditLog.create({ action: `User logout failed: ${error.message}`, timestamp: new Date() });
        res.status(500).json({ error: 'Internal server error' });
    }
}

const userLogin = async (req, res) => {
    try {
        // Validate incoming data
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // Log to AuditLog
            await AuditLog.create({ action: `User login failed: User with email ${email} does not exist`, timestamp: new Date() });
            return res.status(400).json({ error: 'User does not exist' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            // Log to AuditLog
            await AuditLog.create({ action: `User login failed: Invalid password for user with email ${email}`, timestamp: new Date() });
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Find User Role
        const foundUserRole = await UserRoles.findOne({ where: { user_id: user.user_id } }); 
        // Find Role
        const role = await Role.findOne({ where: { role_id: foundUserRole.role_id } });

        // Create a JWT access token
        const accessToken = jwt.sign({ userId: user.user_id, role: role.role_name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        // Create a refresh token (stored in cookies)
        const refreshToken = jwt.sign({ userId: user.user_id, role: role.role_name }, process.env.REFRESH_TOKEN_SECRET);

        // Create profile for the user
        const profile = await Profile.findOne({ where: { user_id: user.user_id } });

        // Save the refresh token to the profile entity
        await Profile.update({ refresh_token: refreshToken }, { where: { user_id: user.user_id } });

        // Log to AuditLog
        await AuditLog.create({ action: `User login successful: User with email ${email} logged in`, timestamp: new Date() });

        // Send the refresh token as a cookie
        res.cookie('accessToken', accessToken, { httpOnly: true });

        // Respond with access token
        res.status(200).json({ profile: profile, token: accessToken, role: role.role_name });
    } catch (error) {
        console.error('Error:', error);
        // Log to AuditLog
        await AuditLog.create({ action: `User login failed: ${error.message}`, timestamp: new Date() });
        res.status(500).json({ error: 'Internal server error' });
    }
}

const userPasswordReset = async (req, res) => {
    try {
        // Validate incoming data
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Validate password with joi
        const schema = Joi.object({
            password: Joi.string().trim().min(3).required()
        });

        const { error } = schema.validate({ password });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // Log to AuditLog
            await AuditLog.create({ action: `User password reset failed: User with email ${email} does not exist`, timestamp: new Date() });
            return res.status(400).json({ error: 'User does not exist' });
        }

        // Hash the password with bcrypt
        const saltRounds = process.env.SALT_ROUNDS || 10;
        const salt = bcrypt.genSalt(saltRounds);
        const hashedPassword = bcrypt.hash(password, salt);

        // Update the user's password
        await User.update({ password_hash: hashedPassword }, { where: { email } });

        // Log to AuditLog
        await AuditLog.create({ action: `User password reset successful: User with email ${email} password reset`, timestamp: new Date() });

        // Send a response
        res.status(200).json({ message: 'Password reset successful' });

    } catch (error) {
        console.error('Error:', error);
        // Log to AuditLog
        await AuditLog.create({ action: `User password reset failed: ${error.message}`, timestamp: new Date() });
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    generateAccessToken,
    userRegister,
    userLogout,
    userLogin,
    userPasswordReset
};
