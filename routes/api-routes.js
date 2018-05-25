// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");


module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/admin");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function(user) {
      req.login(user, (err) => {
        if (err) throw err;
        res.json('/admin');
      });
      
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/allWines", function (req, res){
    console.log("We hit the route API FILE!!",db);
    db.foodPairing.findAll().then(function (dbResponse) {
      console.log(dbResponse)
      res.json(dbResponse);
    });
  });

  app.get("/api/zip", function (req, res){
    console.log("We hit the route API FILE!!",db);
    db.foodPairing.findAll().then(function (dbResponse) {
      console.log(dbResponse)
      res.json(dbResponse);
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post("/api/pairingRecord", function (req, res) {
    console.log("Hit it", req.body);
    var saveFormat = {
      zip: req.body.zip, 
      food: req.body.food,
      paired: true,
      first_match: req.body.pairingInfo.productMatches[0].title,
      description: req.body.pairingInfo.pairingText
    }
    console.log("Damn Gurl", saveFormat)  
    db.foodpairings.create(saveFormat).then(function (dbResponse) {

      console.log(dbResponse)
    });
    // res.send("all good");
  })

  app.post('/api/messages/', function (req, res) {
    console.log("i'm a log");
    console.log(db.Messages, "this is db");
    // edited burger create to add in a burger_name
    db.Messages.create({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      })
      // pass the result of our call
      .then(function (newMessage) {
        // log the result to our terminal/bash window
        console.log(newMessage);
        // redirect
        
      });

    // //working on foodpairing part here://
    // pairInfo("../foodpairing.js", function(data){});
  });


  //PM TESTS
  

  // Find all the first_match (picked wine)
  // SipIt_db
  // .findAndCountAll({
  //    where: {
  //     first_match: {
  //         [Op.like]: 'foo%'
  //       }
  //    },
  // })
  // .then(result => {
  //   console.log(result.count);
  //   console.log(result.rows);
  // });



};
