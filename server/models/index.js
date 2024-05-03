const sequelize = require('../config/database');

// Models
const User = require('./User');
const Profile = require('./Profile');
const Role = require('./Role');
const UserRoles = require('./UserRoles');
const Competition = require('./Competition');
const Ticket = require('./Ticket');
const Winner = require('./Winner');
const Payment = require('./Payment');
const AuditLog = require('./AuditLog');

// Define Relationships
User.hasOne(Profile, { foreignKey: 'user_id' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

User.belongsToMany(Role, { through: UserRoles, foreignKey: 'user_id' });
Role.belongsToMany(User, { through: UserRoles, foreignKey: 'role_id' });

Ticket.belongsTo(Competition, { foreignKey: 'competition_id' });
Competition.hasMany(Ticket, { foreignKey: 'competition_id' });

Ticket.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Ticket, { foreignKey: 'user_id' });

Winner.belongsTo(Competition, { foreignKey: 'competition_id' });
Competition.hasMany(Winner, { foreignKey: 'competition_id' });

Winner.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Winner, { foreignKey: 'user_id' });

Payment.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Payment, { foreignKey: 'user_id' });

AuditLog.belongsTo(User, { foreignKey: 'user_id' });

// Sync models with database
sequelize.sync();

module.exports = {
  User,
  Profile,
  Role,
  UserRoles,
  Competition,
  Ticket,
  Winner,
  Payment,
  AuditLog
};
