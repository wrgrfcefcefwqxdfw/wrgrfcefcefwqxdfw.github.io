function displayCart() {
  let subtotal; let quantity;
  var userlist = sessionStorage['userList'];
  listOfUsers = JSON.parse(userlist);
  var id = sessionStorage.getItem('id');
  for (var i = 0; i < listOfUsers.length; i++) {
    if (listOfUsers[i].id == id) {
        if (listOfUsers[i].cartNumbers > 0){

          subtotal = listOfUsers[i].totalCost; //retrieves the total cost of the products
          quantity = listOfUsers[i].cartNumbers;
          break;
        }
        else{
          subtotal = localStorage.getItem('totalCost'); //retrieves the total cost of the products
          quantity = localStorage.getItem('cartNumbers');
        }
    }
  }

  subtotal = parseFloat(subtotal);
  let tax = subtotal * 0.07; //calculate tax
  tax = tax.toFixed(2); //round tax to 2dp
  tax = parseFloat(tax); //change to float

  let productContainer = document.getElementsByClassName('cart-info'); //is used to check if the element exist
  let product = document.getElementById('no-product'); //is used to remove this element if there is item added to cart

  if (quantity && productContainer) { //checks if there is product added to cart.
    var node = document.createElement('tr'); //creates a table row
    node.innerHTML = `<td><div id="cart-info" class="cart-info">
      <ion-icon onclick="removeItems()" size="large" name="trash-outline"></ion-icon>
      <img src="../images/hgsinanju.webp" alt="" width="40%">
      <div class="">
        <p>HGUC MSN-06S <br>Sinanju
        </p>
      </div>
    </div></td>
    <td id="cartQuantity">${quantity}</td>
    <td id="cartSubtotal">${subtotal}</td>`

    document.getElementById('cart-page').appendChild(node); //appends all the things above
    product.style.display = "none"; //remove the 'nothing bought yet!'
    document.getElementsByTagName('tr')[2].setAttribute('id', 'cart');

    document.getElementById('subtotal').innerText = `$${subtotal}` //write the subtotal
    document.getElementById('tax').innerText = `$${tax}` //write the Tax
    document.getElementById('total').innerText = `$${subtotal+tax}` //write the total
  }
}

function removeItems() {
  var remove = confirm("Do you want to remove?"); //asks if want to delete the items
  if (remove) { //if yes
    document.getElementById('no-product').style.display = ''; //show 'nothing is bought yet!'
    document.getElementById('cart').remove(); //remove the products
    document.getElementById('subtotal').innerText = `$0.0` //write the subtotal
    document.getElementById('tax').innerText = `$0.0` //write the Tax
    document.getElementById('total').innerText = `$0.0` //write the total
    localStorage.removeItem('totalCost');
    localStorage.removeItem('cartNumbers');
    var userlist = sessionStorage['userList'];
    listOfUsers = JSON.parse(userlist);
    var id = sessionStorage.getItem('id');
    for (var i = 0; i < listOfUsers.length; i++) {
      if (listOfUsers[i].id == id) {
          delete listOfUsers[i].totalCost;
          delete listOfUsers[i].cartNumbers;
      }
    }
    listOfUsers = JSON.stringify(listOfUsers);
    sessionStorage.setItem('userList',listOfUsers)
  }
}

displayCart()

let button = document.querySelector('button');

button.addEventListener('click',()=>{
  if (localStorage.getItem('login') == 'yes'){
    window.location.href = "../pay/payment.html";
  } 
})
