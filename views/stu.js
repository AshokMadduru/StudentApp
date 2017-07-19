var addStudent = document.querySelector('.addStudent');
var nameText = document.querySelector('.name');
var rollnoText = document.querySelector('.rollno');
var branchText = document.querySelector('.branch');

var studentData;

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
        studentData = JSON.parse(this.responseText);
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
  html += '<li>' + res[i].name + addButton(res[i].id);
  html += '</li>';
}
var div = document.getElementById('data');

div.innerHTML = '<ul>' + html + '</ul>';
}

function addButton(id) {
  var buttonField = "<button onclick=editStudent(this) id='edit"+id
        +"'>Edit</button><button onclick=removeStudent(this) id='remove"
        +id+"'>Remove</button>";
  return buttonField;
}

function editStudent(event) {
    var studentId = event.id.replace('edit','');
  createModel(studentId);
}

function createModel(id) {
  var stuData = getStuData(id);
  console.log(stuData.name + "," + stuData.branch);
  var modelHtml = "<div id='myModal' class='modal'>"+
  "<div class='modal-content'><span class='close'>&times;</span>"+
    "<p>Some text in the Modal..</p></div></div>"
    var modelDiv = document.getElementById('m');
    modelDiv.innerHTML = modelHtml;

  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}

function getStuData(id) {
  console.log( studentData + id);
  for (var i = 0; i < studentData.length; i++) {
    console.log(studentData[i].id);
    if (id === studentData[i].id) {
      console.log(studentData[i]);
      return studentData[i];
    }
  }
}

function removeStudent(event) {
  var studentId = event.id.replace('remove','');
  var studentsUrl = "http://127.0.0.1:8000/remove?id="+studentId;
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        getStudentsData();
    }
  };
  req.open("GET", studentsUrl, true);
  req.setRequestHeader('Access-Control-Allow-Origin', '*/*');
  req.setRequestHeader('Access-Control-Allow-Credentials', 'true');
  //req.setRequestHeader("Content-Type", "application/json")
  req.send();
}
