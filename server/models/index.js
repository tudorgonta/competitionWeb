const sequelize = require('./database');

// Models
const User = require('./models/User');
const Profile = require('./models/Profile');
const Role = require('./models/Role');
const UserRoles = require('./models/UserRoles');
const Competition = require('./models/Competition');
const Ticket = require('./models/Ticket');
const Winner = require('./models/Winner');
const Payment = require('./models/Payment');
const AuditLog = require('./models/AuditLog');

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
