/* global Product, Cart */

'use strict';
var cart;
const cartContents = document.getElementById('cartContents');
// Set up an empty cart for use on this page.
const checkLocalStorage = () => {
    if (localStorage['cart']) {
        cart = new Cart(JSON.parse(localStorage['cart']));
    } else {
        cart = new Cart([]);
    }
};

const renderCartContents = () => {
    cart.items.forEach(item => {
        createTheElement('p', `Item: ${item.product} \u00A0 \u00A0 \u00A0 Quantity: ${item.quantity}`, cartContents);
    });
    updateCounter();
};
var selectElement = document.getElementById('items');

/********** Helper Functions *******************/
const createTheElement = function(element, content, parentContainer){
    const newEle = document.createElement(element);
    newEle.textContent = content;
    parentContainer.appendChild(newEle);
};
/*****************************************************************/

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
    //TODO: Add an <option> tag inside the form's select for each product
    Product.allProducts.forEach((prod) => {
        createTheElement('option', prod.name, selectElement);
    });

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

    // TODO: Prevent the page from reloading
    event.preventDefault();
    // Do all the things ...
    addSelectedItemToCart();
    cart.saveToLocalStorage();
    updateCounter();
    updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
    // TODO: suss out the item picked from the select list
    // TODO: get the quantity
    // TODO: using those, add one item to the Cart
    const product = selectElement.options[selectElement.selectedIndex].text;
    const quantity = parseInt(document.getElementById('quantity').value);
    cart.addItem(product, quantity);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
    const counter = document.getElementById('itemCount');
    counter.textContent = `(${cart.items.length})`;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
    // TODO: Get the item and quantity from the form
    // TODO: Add a new element to the cartContents div with that information
    const item = selectElement.options[selectElement.selectedIndex].text;
    const quantity = parseInt(document.getElementById('quantity').value);
    createTheElement('p', `Item: ${item} \u00A0 \u00A0 \u00A0 Quantity: ${quantity}`, cartContents);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
checkLocalStorage();
renderCartContents();
