var loginform = document.getElementById('loginform');
var regform = document.getElementById('regform');
var indicator = document.getElementById('indicator');

function register() {
  regform.style.transform = "translateX(300px)";
  loginform.style.transform = "translateX(300px)";
  indicator.style.transform = "translateX(60px)";

}

function login() {
  regform.style.transform = "translateX(0px)";
  loginform.style.transform = "translateX(0px)";
  indicator.style.transform = "translateX(-60px)";
}

var userList;

if (localStorage.getItem("login")=="yes"){
  window.location.replace("buy.html");
}

function existingCredentials(list,cred){ //check is account is taken already
  for (var i =0; i<list.length;i++){
    if (JSON.stringify(list[i]) == cred){
      return true;
      break;
    }
  }
}

function createID(username){
  var id = '';
  for (var i = 0; i<username.length; i++){
    id += username[i].charCodeAt().toString();
  }
  return id;
}

function createUser() {
  var username = document.getElementById('unnew').value;
  var passwd = document.getElementById('pwnew').value;
  var userList;
  //check if session storage contain userList entry
  if (sessionStorage['userList']!=null) {
    //retrieve userList from session storage and store it in userList object
    userList = JSON.parse(sessionStorage.getItem("userList"));
  }
  else {
  //if userList does not exist in session storage, create userList as a new array
    userList = [];
  }
  var id = createID(username);
  var usercred = {userName:username,password:passwd,id:id};
  var temp = JSON.stringify(usercred);
  if (existingCredentials(userList,temp)){
    alert('Username taken');
  }else{
    //Add user credential to user list
    userList.push(usercred);
    //Store updated user list to session storage
    sessionStorage.setItem("userList",JSON.stringify(userList));
    alert("Account Created")
  }

}

function authenticateUser() {
  var username = document.getElementById('un').value;
  var passwd = document.getElementById('pw').value;
  var listOfUsers;
  if (sessionStorage['userList']!=null) {
    var userlist = sessionStorage['userList']
    listOfUsers = JSON.parse(userlist);
    //Use a for loop to check whether user credential is valid
    //if user credential is valid, alert('login successful!')
    for (var i=0;i<listOfUsers.length;i++){
      if(listOfUsers[i].userName == username && listOfUsers[i].password == passwd){
        var id = createID(username);
        sessionStorage.setItem('id',id);
        localStorage.setItem("login","yes")
        alert("login successful");
        location.href ="buy.html";
        break;
      }
      if (i==listOfUsers.length-1){
        alert("Incorrect Password or Username");
        break;
      }
    }
  }
  else {
    alert('No account registered!');
  }
  return false;
}


