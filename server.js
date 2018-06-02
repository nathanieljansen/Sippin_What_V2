// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var exphbs = require("express-handlebars");
// const nodemailer = require('nodemailer');
const sequelize = require("sequelize");
const thisThing = ("nodemailer")

var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static(__dirname + '/config'))

app.use(express.static(__dirname + '/public'))

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Requiring our models and passport as we've configured it
var db = require("./models");
var passport = require("./config/passport");

module.exports =  (app) => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/admin");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup",  (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then( ()=> {
      res.redirect(307, "/api/login");
    }).catch((err) => {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout",  (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

};

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});



// app.get("api/pairingRecord", (req, res) => {
//   res.render("pairingRecord");
// });

app.get("/api/allWines", (req, res) => {
    sql.connect(sqlConfig, function() {
        var wine = new sql.Request();
        wine.query('SELECT COUNT(zip) FROM foodpairings', function(err, recordset) {
          console.log("all the zipcodes thagt you asked for" + zip);
            if(err) console.log(err);
            res.end(JSON.stringify(recordset)); // Result in JSON format
        });
    });
})

app.get("/api/zip", (req, res) => {
  res.json("zip");
});

app.get("/api/ages", (req, res) => {
    res.json("ages");
});


db.sequelize.sync(({force:true})).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
})