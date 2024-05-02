const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Competition = require('./Competition');
const User = require('./User');

const Ticket = sequelize.define('Ticket', {
  ticket_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  competition_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Competition,
      key: 'competition_id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  purchase_date: DataTypes.DATE
});

module.exports = Ticket;
