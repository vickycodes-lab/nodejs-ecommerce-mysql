fetch("/products")
.then(res => res.json())
.then(data => {

let container = document.getElementById("product-list");

container.innerHTML = ""; // clear old products

data.forEach(product => {

let card = document.createElement("div");
card.classList.add("product-card");

card.innerHTML = `
<img src="../public/images/${product.image}" width="150">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<button onclick="addToCart(${product.id})">
Add to Cart
</button>
`;

container.appendChild(card);

});

})
.catch(err => console.log("Error loading products:", err));