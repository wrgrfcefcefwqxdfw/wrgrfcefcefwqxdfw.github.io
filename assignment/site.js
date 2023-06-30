//welcome screen
const splash = document.querySelector('.splash');
document.addEventListener('DOMContentLoaded', (e) => { //when document loaded
  setTimeout(() => {
    document.getElementById("splash").classList.add('display-none');
  }, 2000); //2 secs, fades out
})

//dark to light and vice-versa
let themeToggler = document.getElementById('theme-toggler');
themeToggler.onclick = () => {
  //adds the sun thing
  themeToggler.classList.toggle('fa-sun');
  sessionStorage.setItem("theme", "dark");
  if (themeToggler.classList.contains('fa-sun')) {
    //makes it dark
    document.body.classList.add('active');

  } else {
    //removes class makes it light
    document.body.classList.remove('active');
    sessionStorage.setItem("theme", "light");
  }
}

//maintain theme
if (sessionStorage.getItem("theme")=="dark"){
  themeToggler.classList.toggle('fa-sun');
  document.body.classList.add('active');
} else {
  document.body.classList.remove('active');
}

//logout
function logout() {
  var login = localStorage.getItem('login');
  if (login == 'yes'){
    var quit = confirm("Do you want to logout?");
    if (quit == true){
      sessionStorage.removeItem('id');
      localStorage.clear();
      location.reload();
    }
  }
}

