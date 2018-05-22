const Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');


const connection = require('../config/connection');
module.exports.authenticate = function (req, res) {
  const email = req.body.email;
  const password = req.body.password;


  connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query'
      })
    } else {

      if (results.length > 0) {
        decryptedString = cryptr.decrypt(results[0].password);
        if (email || password === ""){
          console.log("Input a valid email or password")
        }
        if (password == decryptedString) {
          res.redirect("../admin")
        } else {
          res.json({
            status: false,
            message: "Email and password does not match"
          });
        }

      } else {
        res.redirect("../login")
      }
    }
  });
}
