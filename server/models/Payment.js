const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

const Payment = sequelize.define('Payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  amount: DataTypes.DECIMAL,
  payment_date: DataTypes.DATE,
  payment_method: DataTypes.STRING,
  status: DataTypes.STRING
});

module.exports = Payment;
