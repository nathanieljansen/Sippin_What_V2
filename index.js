const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;
const exphbs = require("express-handlebars");
const connection = require("./config/connection.js")

var authenticateController = require('./config/authenticate-controller');
var registerController = require('./config/register-controller');

app.use(bodyParser.urlencoded({
  extended: true
}))

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
app.get("/registerUser", (req, res) => {
  res.render("registerUser");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.use(express.static(__dirname + '/public'))

app.post('/api/register', registerController.register);
app.post('/api/authenticate', authenticateController.authenticate);

console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});


