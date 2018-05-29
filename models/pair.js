
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var db = {};

module.exports =  (sequelize, DataTypes) => {
    var foodpairings = sequelize.define("foodpairings", {
        age: {
            type: DataTypes.STRING,
            allowNull: false
        },
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
         description: {
             type: DataTypes.STRING,
             allowNull: false,
             max_allowed_packet: true
         },

        first_match: {
            type: DataTypes.STRING,
        // mmmmSuperSexy_match
        },
        second_match: {
            type: DataTypes.STRING,
            // mmmmSuperSexy_match
        },
        description: {
            type: DataTypes.STRING(2000),
            // allowNull: false
        },
    });
    return foodpairings;
};
