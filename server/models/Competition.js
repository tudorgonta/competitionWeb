const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Competition = sequelize.define('Competition', {
  competition_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE,
  ticket_price: DataTypes.DECIMAL,
  total_tickets: DataTypes.INTEGER,
  tickets_sold: DataTypes.INTEGER,
  image_url: DataTypes.STRING
}, { timestamps: false });

module.exports = Competition;
