//process data from the feedback blah blah
<!-- HIDE FROM INCOMPATIBLE BROWSERS
var formData = location.search;
formData = formData.substring(1, formData.length);
while (formData.indexOf("+") != -1) {
  formData = formData.replace("+", " ");
}
formData = unescape(formData);
var formArray = formData.split("&");
var para = new Array();

// STOP HIDING FROM INCOMPATIBLE BROWSERS -->
var d = new Date().toLocaleDateString();
document.getElementById('date').innerText = d;
for (var i = 0; i < formArray.length; ++i) {
  para = formArray[i].split("=");
  switch (para[0]) {
    case "contact":
      document.getElementById("contact").innerHTML = para[1];
      break;
    case "email":
      document.getElementById("email").innerHTML = para[1];
      var mail = para[1];
      break;
    case "opinions":
    if (para[1].length==0) {
      document.getElementById("opinions").innerHTML = "You did not enter any opinions."
    } else{
      document.getElementById("opinions").innerHTML = "Your thoughts on the website was: "+ para[1];
    }
  }

}

