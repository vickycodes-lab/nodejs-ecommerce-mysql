function addToCart(name, price){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name:name,
price:price
});

localStorage.setItem("cart", JSON.stringify(cart));

alert(name + " added to cart");

}

function loadCart(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cart-items");

let total = 0;

cart.forEach((item,index)=>{

let div = document.createElement("div");

div.innerHTML = `
<h3>${item.name}</h3>
<p>₹${item.price}</p>
<button onclick="removeItem(${index})">Remove</button>
`;

container.appendChild(div);

total += item.price;

});

document.getElementById("total").innerText = "Total: ₹" + total;

}

function removeItem(index){

let cart = JSON.parse(localStorage.getItem("cart"));

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

location.reload();

}

if(document.getElementById("cart-items")){
loadCart();
}