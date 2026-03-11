let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItems = document.getElementById("cart-items");

let total = 0;

cart.forEach(function(item){

let li = document.createElement("li");

li.innerText = item.name + " - ₹" + item.price;

cartItems.appendChild(li);

total += item.price;

});

document.getElementById("total").innerText = total;