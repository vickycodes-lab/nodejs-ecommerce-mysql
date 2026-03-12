fetch("/products")
.then(res => res.json())
.then(data => {

let container = document.getElementById("product-list");

data.forEach(product => {

let card = document.createElement("div");
card.classList.add("product-card");

card.innerHTML = `
<img src="/images/${product.image}" width="150">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<button onclick="addToCart('${product.name}',${product.price})">
Add to Cart
</button>
`;

container.appendChild(card);

});

});