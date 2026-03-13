fetch("/cart/1")
.then(res => res.json())
.then(data => {

let container = document.getElementById("cart-items");

let total = 0;

data.forEach(item => {

total += item.price * item.quantity;

container.innerHTML += `
<div class="cart-item">
<img src="/images/${item.image}" width="120">
<h3>${item.name}</h3>
<p>Price: ₹${item.price}</p>
<p>Quantity: ${item.quantity}</p>
</div>
`;

});

document.getElementById("total").innerText = "Total: ₹" + total;

});