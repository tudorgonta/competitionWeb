const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Profile = sequelize.define('Profile', {
  profile_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  phone_number: Sequelize.STRING,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  country: Sequelize.STRING,
  postal_code: Sequelize.STRING,
  refresh_token: Sequelize.STRING
}, {
  timestamps: false
});

module.exports = Profile;