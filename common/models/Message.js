const { DataTypes } = require("sequelize");

const MessageModel = {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true
    },

    content: {
        type: DataTypes.TEXT, // message text
        allowNull: false
    },

    channelId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

module.exports = (sequelize) => {
    const Message = sequelize.define("message", {
        
    }, {
        tableName: "messages",
        timestamps: true // automatically adds createdAt and updatedAt
    });

    return Message;
};