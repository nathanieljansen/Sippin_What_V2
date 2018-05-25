
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

module.exports = function (sequelize, DataTypes) {
    var foodpairings = sequelize.define("foodpairings", {
        // age: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        zip: {
            type: DataTypes.STRING,
            allowNull: true
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
            type: DataTypes.STRING(2000),
            // allowNull: false
        },
    });
    return foodpairings;
};