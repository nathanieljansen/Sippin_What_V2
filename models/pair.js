const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "SipIt_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();
});


module.exports = function (sequelize, DataTypes) {
    var FoodPairing = sequelize.define("FoodPairing", {
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
            allowNull: false
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
            allowNull: false
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
            allowNull: false
        },
    });
    return FoodPairing;
};