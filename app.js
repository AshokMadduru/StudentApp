var http = require("http");
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var store = require('./store.js');
var student = require('./client.js');

http.createServer(function (req, res) {

  /* response.writeHead(200, {'Content-Type': 'text/plain'});
   console.log(request.url);
   response.write(request.url);
   response.end();

   if(req.method=='POST') {
           var body='';
           req.on('data', function (data) {
               body +=data;
           });
           req.on('end',function(){
               var POST =  qs.parse(body);
               console.log(POST);
           });
   }else if(req.method=='GET') {
       var url_parts = url.parse(req.url,true);
       console.log(url_parts.query);
   }*/

   var pathname = (url.parse(req.url).pathname).replace('/','');
    var q = url.parse(req.url, true).query;
   if (pathname === 'add') {
     store.addStudent(q.name, q.rollno , q.branch, (err, result) => {
       res.writeHead(200, {'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*/*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true});
       if (err)
          console.log(err);
        else {
          console.log(result);
          res.end(result);
        }
     });
   } else if (pathname === 'remove') {
     console.log(q.id);
     store.removeStudent(q.id, (err, result) => {
       res.writeHead(200, {'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*/*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true});
       if (err)
          console.log(err);
        else {
          console.log(result);
          res.end(result);
        }
     });
   } else if (pathname === 'update') {
     store.updateStudent(q.name, q.rollno , q.branch, q.id,
                                      (err, result) => {
                                        res.writeHead(200, {'Content-Type': 'application/json',
                                      'Access-Control-Allow-Origin': '*/*',
                                     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                                     'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                                     'Access-Control-Allow-Credentials': true});
       if (err)
          console.log(err);
        else {
          console.log(result);
          res.end(result);
        }
     });
   } else if (pathname === 'get') {
     store.getStudents((err, result) => {
       res.writeHead(200, {'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': 'http://localhost:8000',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true});
       if (err)
          console.log(err);
        else {
          console.log(result);
          res.end(result);
        }
     });
   } else if (pathname == 'students'){
     fs.readFile("./views/students.html", function (err, data) {
      if (err) {
         console.log(err);
         res.writeHead(404, {'Content-Type': 'text/html',
       'Access-Control-Allow-Origin': '*/*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Access-Control-Allow-Credentials': true});
      }else {
         res.writeHead(200, {'Content-Type': 'text/html',
       'Access-Control-Allow-Origin': '*/*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Access-Control-Allow-Credentials': true});
         res.write(data.toString());
      }
      // Send the response body
      res.end();
   });
 } else {
   console.log('in else');
   fs.readFile("./views/stu.js", function (err, data) {
    if (err) {
       console.log(err);
       res.writeHead(404, {'Content-Type': 'text/html',
     'Access-Control-Allow-Origin': '*/*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true});
    }else {
       res.writeHead(200, {'Content-Type': 'text/html',
     'Access-Control-Allow-Origin': '*/*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true});
       res.write(data.toString());
    }
    // Send the response body
    res.end();
 });
 }
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/')
