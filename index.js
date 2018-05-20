const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;
const exphbs = require("express-handlebars");

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
app.use(express.static(__dirname + '/public'))

require('./config/routes.js')

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});