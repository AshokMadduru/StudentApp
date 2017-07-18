var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ash@k001",
  database: "student_app"
});

//function addStudent()

module.exports = {
  addStudent : function(name, roll, branch, id) {
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO students (id, name, branch, rollno) VALUES ('";
      var valuesString = id + "' , '" + name + "' , '" + branch + " , '" + roll + "')";
      sql += valuesString;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
  }
};
