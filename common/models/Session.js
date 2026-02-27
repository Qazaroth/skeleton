const { DataTypes } = require("sequelize");

const SessionModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },

    deviceName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },

    userAgent: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    lastActiveAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    isRevoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}

module.exports = (sequelize) => { 
    const Session = sequelize.define("session", SessionModel);

    return Session;
};