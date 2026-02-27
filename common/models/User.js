const { DataTypes } = require("sequelize");

const UserModel = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    displayName: {type: DataTypes.STRING, allowNull: true},
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    discriminator: { type: DataTypes.STRING(10), allowNull: true, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("user", "admin", "owner"), defaultValue: "user" },
    icon: { type: DataTypes.STRING, allowNull: true }
};

module.exports = (sequelize) => {
    const User = sequelize.define("user", UserModel, {
        defaultScope: {
            attributes: {
                exclude: ["password"]
            }
        },
        scopes: {
            withPassword: {
                attributes: {}
            }
        }
    });

    // Generate a unique discriminator before creating user
    User.beforeCreate(async (user, options) => {
        let isUnique = false;
        let newDiscriminator;

        while (!isUnique) {
            newDiscriminator = Math.floor(1000 + Math.random() * 9000).toString();
            const existing = await User.findOne({ where: { discriminator: newDiscriminator }});
            if (!existing) isUnique = true;
        }

        user.discriminator = newDiscriminator;
    });

    return User;
};