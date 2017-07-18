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
   res.writeHead(200, {'Content-Type': 'application/json'});
   var pathname = (url.parse(req.url).pathname).replace('/','');
    var q = url.parse(req.url, true).query;
   if (pathname === 'add') {
     store.addStudent(q.name, q.rollno , q.branch, (err, result) => {
       if (err)
          console.log(err);
        else {
          console.log(result);
          res.end(result);
        }
     });
   } else if (pathname === 'remove') {
     store.removeStudent(q.id, (err, result) => {
       if (err)
          console.log(err);
        else {
          console.log(result);
          res.end(result);
        }
     });
   } else if (pathname === 'update') {
     store.updateStudent(q.nameuName, q.rollno , stuq.branch, stq.iduId,
                                      (err, result) => {
       if (err)
          console.log(err);
        else {
          console.log(result);
          res.end(result);
        }
     });
   } else if (pathname === 'get') {
     store.getStudents((err, result) => {
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
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else {
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.write(data.toString());
      }
      // Send the response body
      res.end();
   });
 } else {
  // student.studentsApp();
 }
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/')
