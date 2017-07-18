var addStudent = document.querySelector('.addStudent');
addStudent.addEventListener('click', getStudentsData);
console.log('loaded');

function getStudentsData() {
  var studentsUrl = "http://127.0.0.1:8080/get";
  var req = new XMLHttpRequest();
  console.log('in getting');
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        console.log(this.responseText);
    }
  };
  req.open("GET", studentsUrl, true);
  //req.setRequestHeader("Content-Type", "application/json")
  req.send();
}

var callback = function(response){
   // Continuously update stream with data
   var body = '';
   response.on('data', function(data) {
      body += data;
   });

   response.on('end', function() {
      // Data received completely.
      console.log(body);
   });
}

function showStudentForm() {
  getStudentsData();
}
