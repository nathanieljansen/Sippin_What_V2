
module.exports = function (sequelize, DataTypes) {
    var foodPairing = sequelize.define("foodPairing", {
        // age: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        food: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        paired: {
            type: DataTypes.BOOLEAN,
            default: true
        },
        // general_notes: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
        first_match: {
            type: DataTypes.STRING,
        
        },
        // comparable_wines1: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // comparable_wines2: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // comparable_wines3: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        description: {
            type: DataTypes.STRING,
            // allowNull: false
        },
    });
    return foodPairing;
};