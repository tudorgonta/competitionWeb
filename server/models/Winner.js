const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Competition = require('./Competition');
const User = require('./User');

const Winner = sequelize.define('Winner', {
  winner_id: {
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
  win_date: DataTypes.DATE,
  prize_description: DataTypes.TEXT
}, { timestamps: false });

module.exports = Winner;
