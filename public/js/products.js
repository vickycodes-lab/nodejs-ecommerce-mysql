fetch("/products")
.then(res => res.json())
.then(data => {

let container = document.getElementById("product-list");

data.forEach(product => {

let div = document.createElement("div");

div.className = "product";

div.innerHTML = `
<h3>${product.name}</h3>
<p>Price: ₹${product.price}</p>
<button onclick="addToCart('${product.name}',${product.price})">
Add to Cart
</button>
`;

container.appendChild(div);

});

});