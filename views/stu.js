var addStudent = document.querySelector('.addStudent');
var nameText = document.querySelector('.name');
var rollnoText = document.querySelector('.rollno');
var branchText = document.querySelector('.branch');

addStudent.addEventListener('click', validateFormData);
getStudentsData();

function validateFormData() {
    var name = nameText.value;
    var branch = branchText.value;
    var rollno = rollnoText.value;
    console.log(name+","+branch+","+rollno);
    sendStudentData(name, branch, rollno);
}

function sendStudentData(name, branch, rollno) {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("branch", branch);
  formData.append("rollno", rollno);
  var url = "http://127.0.0.1:8000/add?"+"name="+name+"&branch="+branch+"&rollno"+rollno;
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        getStudentsData();
    }
  };
  req.open("GET", url, true);
  req.setRequestHeader('Access-Control-Allow-Origin', '*/*');
  req.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  //req.setRequestHeader("Content-Type", "application/json")
  req.send();
}

function getStudentsData() {
  var studentsUrl = "http://127.0.0.1:8000/get";
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        showStudentsData(this.responseText);
    }
  };
  req.open("GET", studentsUrl, true);
  req.setRequestHeader('Access-Control-Allow-Origin', '*/*');
  req.setRequestHeader('Access-Control-Allow-Credentials', 'true');
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

function showStudentsData(response) {
  nameText.value = '';
  branchText.value = '';
  rollnoText.value = '';
  var res = JSON.parse(response);
  var html = '';

for (var i = 0; i < res.length; i++) {
  html += '<li>' + res[i].name;
  html += '</li>';
}
var div = document.getElementById('data');

div.innerHTML = '<ul>' + html + '</ul>';
}
