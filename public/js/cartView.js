// Get cart data from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get HTML elements
let cartItems = document.getElementById("cart-items");
let totalElement = document.getElementById("total");

let total = 0;

// Clear previous items
cartItems.innerHTML = "";

// Loop through cart
cart.forEach(function(item){

let li = document.createElement("li");

li.innerText = item.name + " - ₹" + item.price;

cartItems.appendChild(li);

// Calculate total
total += item.price;

});

// Show total price
totalElement.innerText = "Total: ₹" + total;


// Place order function
function placeOrder(){

fetch("/place-order",{
method:"POST"
})
.then(res => res.text())
.then(data=>{

alert(data);

// clear cart after order
localStorage.removeItem("cart");

// reload page
window.location.reload();

});

}