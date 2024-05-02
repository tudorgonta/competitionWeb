const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Role = sequelize.define('Role', { // enum: ['admin', 'user', 'moderator']
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_name: DataTypes.STRING
});

module.exports = Role;