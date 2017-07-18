var http = require("http");
var url = require('url');
var qs = require('querystring');
var store = require('./store.js');

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
   console.log(pathname);
   if (pathname === 'add') {
     var q = url.parse(req.url, true).query;
     var stuName = q.name;
     var stuBranch = q.branch;
     var rollNo = q.rollno;
     console.log(stuName + "," + stuBranch + "," + rollNo);
     store(stuName, rollNo , stuBranch);
   } else if (pathname === 'remove') {
     var q = url.parse(req.url, true).query;
     var rollNo = q.rollno;
   } else if (pathname == 'get') {

   }
   res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.name;
  res.end(txt);
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000/')
