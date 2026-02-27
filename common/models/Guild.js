const { DataTypes } = require("sequelize");

const GuildModel = {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING, 
        allowNull: false
    },

    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },

    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

module.exports = (sequelize) => {
    const Guild = sequelize.define(
        "guild", GuildModel,
        {
            tableName: "guilds",
            timestamps: true // optional but recommended for createdAt/updatedAt
        }
    );

    return Guild;
};