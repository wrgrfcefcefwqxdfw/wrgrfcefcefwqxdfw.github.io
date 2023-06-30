let cart = document.querySelectorAll('.add-cart');

// when add to cart is clicked
cart[0].addEventListener('click', () => {
  addToCart();
  cartNumbers();
  totalCost();
  addDetailstoStorage();
})

function addToCart() {
  alert("Item is Added to Cart!");
}

//set the quantity in session storage
function cartNumbers(product) {
  let productNumbers = document.getElementById('item-number').value;
  productNumbers = parseInt(productNumbers);
  localStorage.setItem('cartNumbers', productNumbers);
  var cartNumbers = localStorage.getItem('cartNumbers');
  document.getElementById('amount').setAttribute("data-count", cartNumbers);
}

//calculate total cost
function totalCost() {
  let quantity = parseInt(localStorage.getItem('cartNumbers'));
  let total = quantity * 31.3;
  localStorage.setItem("totalCost", total) //set total cost in local storage
}

// update the userlist with cart info to maintain state
function addDetailstoStorage(){
  var userlist = sessionStorage['userList'];
  listOfUsers = JSON.parse(userlist);
  var id = sessionStorage.getItem('id');
  for (var i = 0; i < listOfUsers.length; i++) {
    if (listOfUsers[i].id == id) {
        listOfUsers[i].cartNumbers = localStorage.getItem('cartNumbers');
        listOfUsers[i].totalCost = localStorage.getItem('totalCost');
    }
  }
  listOfUsers = JSON.stringify(listOfUsers);
  sessionStorage.setItem('userList',listOfUsers)
}

// carousel
const swiper = new Swiper('.swiper', {
  // Optional parameters
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});


window.onload = () => {
  let all = document.getElementsByClassName("zoomIn");

  // click fullscreen
  if (all.length > 0) {
    for (let i of all) {
      i.onclick = () => {
        // exit
        if (document.fullscreenElement != null || document.webkitFullscreenElement != null) {
          i.style.cursor = 'zoom-in';
          if (document.exitFullscreen) { document.exitFullscreen(); }
          else { document.webkitCancelFullScreen(); }
        }

        // Fullscreen
        else {
          i.style.cursor = 'zoom-out';
          if (i.requestFullscreen) { i.requestFullscreen(); }
          else { i.webkitRequestFullScreen(); }
        }
      };
    }
  }
};

function logout() {
  var quit = confirm("Do you want to logout?");
  if (quit == true) {
    localStorage.clear();
    sessionStorage.removeItem('id');
    window.location.replace("register.html");
  }
}
