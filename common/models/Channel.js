const { DataTypes } = require("sequelize");

const ChannelModel = {
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

    // If dm, this will be the id of the person you are dming
    guildId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    isDm: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}

module.exports = (sequelize) => {
    const Channel = sequelize.define(
        "channel", ChannelModel,
        {
            tableName: "channels",
            timestamps: true // createdAt / updatedAt
        }
    );

    return Channel;
};