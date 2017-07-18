var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ash@k001"
});
var createDb = con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE student_app", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

module.exports = createDb;
