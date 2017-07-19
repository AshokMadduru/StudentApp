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
var addStudent = function (name, roll, branch, callBack) {
  //con.connect(function(err) {
  //  if (err) throw err;
    var sql = "INSERT INTO students (name, branch, rollno) VALUES ('";
    var valuesString = name + "' , '" + branch + "' , '" + roll + "')";
    sql += valuesString;
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        return callBack(err);
      } else {
      return callBack(null, JSON.stringify(result));
      }
    });
//  });
}

/**
  Get the list of all students from the db
**/
var getStudents = function (callBack) {
  //con.connect(function(err) {
    //if (err) throw err
    var sql = "select * from students";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        return callBack(err);
      } else {
      return callBack(null, JSON.stringify(result));
      }
    });
  //});
}

/**
  Update given student information based on id
**/
var updateStudent = function (name, roll, branch, id, callBack) {
    var sql = "update students set name = '" + name +"' , branch = '"
                + branch + "' , rollno ='" +roll+"' where id = '" + id + "'";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        return callBack(err);
      } else {
      return callBack(null, JSON.stringify(result));
      }
    });
}

/**
  Remove student from students table
**/
var removeStudent = function (id, callBack) {
  con.connect(function(err) {
    if (err) throw err
    var sql = "delete from students where id = '" + id + "'";
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err) {
        return callBack(err);
      } else {
      return callBack(null, JSON.stringify(result));
      }
    });
  });
}

module.exports = {addStudent, updateStudent, removeStudent, getStudents};
