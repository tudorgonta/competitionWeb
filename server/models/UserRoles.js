const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Role = require('./Role');

const UserRoles = sequelize.define('UserRoles', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'role_id'
    }
  }
});

module.exports = UserRoles;