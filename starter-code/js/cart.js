/* global Cart */
'use strict';
var tableBody = document.getElementById('cart').tBodies.item(0)

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
tableBody.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);


}

document.addEventListener('DOMContentLoaded', ()=>{
  renderCart();
})
function updateCounter() {
  const counter = document.getElementById('itemCount');
  counter.textContent = `(${cart.items.length})`;
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
  updateCounter();
}

// Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  for(let i = 0; i < tableBody.children.length; i++){
    tableBody.children[i].remove();
  }
}

// Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Iterate over the items in the cart
  for(let i = 0; i < cart.items.length; i++){
    // TODO: Create a TR
    let trNode = document.createElement('tr');
    let tdQuantity = document.createElement('td');
    let tdItem = document.createElement('td');
    let tdRemove = document.createElement('td');
    // TODO: Create a TD for the delete link, quantity,  and the item
    tdRemove.textContent = 'x';
    tdQuantity.textContent = cart.items[i].quantity;
    tdItem.textContent = cart.items[i].product;
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    trNode.appendChild(tdRemove);
    trNode.appendChild(tdQuantity);
    trNode.appendChild(tdItem);
    tableBody.appendChild(trNode);
  }

}

function removeItemFromCart(e) {
  // When a delete link is clicked, use cart.removeItem to remove the correct item
  if(e.target.textContent === 'x'){
    cart.removeItem(e.target.parentNode.lastChild.textContent);
    console.log(e.target.textContent)
  }
  // Save the cart back to local storage
  cart.saveToLocalStorage();
  // Re-draw the cart table
  location.reload();
}
