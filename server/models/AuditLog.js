const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const AuditLog = sequelize.define('AuditLog', {
  log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    },
    allowNull: true
  },
  action: DataTypes.TEXT,
  timestamp: DataTypes.DATE,
  ip_address: DataTypes.STRING
}, { timestamps: true });

module.exports = AuditLog;
