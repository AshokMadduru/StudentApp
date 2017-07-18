var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ash@k001",
  database: "student_app"
});

/**
  Insert new student record into students table
**/
function addStudent(name, roll, branch) {
  con.connect(function(err) {
    if (err) throw err;
    var sql = "INSERT INTO students (name, branch, rollno) VALUES ('";
    var valuesString = name + "' , '" + branch + "' , '" + roll + "')";
    sql += valuesString;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}

/**
  Get the list of all students from the db
**/
function getStudents() {
  con.connect(function(err) {
    if (err) throw err
    var sql = "select * from students";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      return result;
    });
  });
}

/**
  Update given student information based on id
**/
function updateStudent(name, roll, branch, id) {
  con.connect(function(err) {
    if (err) throw err
    var sql = "update students set name = '" + name +"' branch = '"
                + branch + "' rollno ='" +roll+"' where id = '" + id + "'";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}

/**
  Remove student from students table
**/
function removeStudent(id) {
  con.connect(function(err) {
    if (err) throw err
    var sql = "delete from students where id = '" + id + "'";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      return result;
    });
  });
}

module.exports = addStudent;
