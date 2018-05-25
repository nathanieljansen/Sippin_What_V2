var express = require('express');
var router = express.Router();
const db = require('../models');
// var foodpairing= require('../models/')["foodpairing"];
// var messages = require('../models/')["messages"];

router.post('/messages/create', function(req, res) {
    console.log("i'm a log");
    console.log(db.Messages, "this is db");
	// edited burger create to add in a burger_name
    db.Messages.create({
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        message:req.body.message,
    })
	// pass the result of our call
	.then(function(newMessage){
		// log the result to our terminal/bash window
		console.log(newMessage);
		// redirect
		res.redirect('/');
    });
    
    // //working on foodpairing part here://
    // pairInfo("../foodpairing.js", function(data){});
});
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