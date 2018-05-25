module.exports = (sequelize, DataTypes) => {
    var Messages = sequelize.define("Messages", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Messages;
};