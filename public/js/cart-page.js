// load cart items
fetch("/cart/1")
.then(res => res.json())
.then(data => {

let container = document.getElementById("cart-items");
let total = 0;

container.innerHTML = "";

data.forEach(item => {

total += item.price * item.quantity;

container.innerHTML += `
<div class="cart-item">
<img src="/images/${item.image}" width="100">
<h3>${item.name}</h3>
<p>Price: ₹${item.price}</p>
<p>Quantity: ${item.quantity}</p>
</div>
`;

});

document.getElementById("total").innerText = "Total: ₹" + total;

})
.catch(err => console.log(err));


// place order
function placeOrder(){

fetch("/place-order",{
method:"POST"
})
.then(res => res.text())
.then(data => {

alert(data);

window.location.reload();

});

}