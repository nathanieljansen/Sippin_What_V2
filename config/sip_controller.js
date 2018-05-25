var express = require('express');
var router = express.Router();
const db = require('../models');
// var foodpairing= require('../models/')["foodpairing"];
// var messages = require('../models/')["messages"];


module.exports=router;


// or shoudl I be doing this?
// // POST route for saving a new todo
// app.post("/api/todos", function(req, res) {
//     // create takes an argument of an object describing the item we want to
//     // insert into our table. In this case we just we pass in an object with a text
//     // and complete property
//     db.Todo.create({
//     text: req.body.text,
//     complete: req.body.complete
//     }).then(function(dbTodo) {
//     // We have access to the new todo as an argument inside of the callback function
//     res.json(dbTodo);
//     });
//     });