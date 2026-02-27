const sequelize = require("../database");

const UserModel = require("./User");
const GuildModel = require("./Guild");
const MessageModel = require("./Message");
const ChannelModel = require("./Channel");
const SessionModel = require("./Session");

// Init models
const User = UserModel(sequelize);
const Guild = GuildModel(sequelize);
const Message = MessageModel(sequelize);
const Channel = ChannelModel(sequelize);
const Session = SessionModel(sequelize);

// Users <-> Guilds (many to many)
User.belongsToMany(Guild, {
    through: "GuildMembers",
    as: "memberGuilds",
    foreignKey: "userId",
    otherKey: "guildId"
});

Guild.belongsToMany(User, {
    through: "GuildMembers",
    as: "members",
    foreignKey: "guildId",
    otherKey: "userId"
});

// Channel belongs to one or no guild (for DM channels)
Channel.belongsTo(Guild, { foreignKey: "guildId", as: "guild" });
Guild.hasMany(Channel, {foreignKey: "guildId", as: "channels" });

// Optional: DMs
// You can have guildId nullable in the Channel table

// Each guild is owned by one user
Guild.belongsTo(User, { foreignKey: "ownerId", as: "owner" });
User.hasMany(Guild, { foreignKey: "ownerId", as: "ownedGuilds" });

User.hasMany(Session, {
    foreignKey: "userId",
    as: "sessions",
    onDelete: "CASCADE"
});

Session.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

module.exports = {
    sequelize,
    User,
    Guild,
    Message,
    Channel,
    Session
}