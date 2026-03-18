function addToCart(product_id){

fetch("/add-to-cart",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    user_id:1,
    product_id:product_id,
    quantity:1
  })
})
.then(res => res.text())
.then(data => {
  alert(data);
});

}


// ================= LOAD CART =================

function loadCart(){

fetch("/cart/1")
.then(res=>res.json())
.then(data=>{

let cartList = document.getElementById("cart-items");
let totalEl = document.getElementById("total");

cartList.innerHTML = "";

let total = 0;

data.forEach(item=>{

total += item.price * item.quantity;

let li = document.createElement("li");
li.innerText = item.name + " - ₹" + item.price + " x " + item.quantity;

cartList.appendChild(li);

});

totalEl.innerText = "Total: ₹" + total;

});

}


// ================= FAKE PAYMENT + ORDER =================

function checkout(){

alert("Processing Payment... ⏳");

setTimeout(()=>{

alert("Payment Successful ✅");

fetch("/place-order",{
  method:"POST"
})
.then(res=>res.text())
.then(data=>{
  alert(data);
  window.location.href = "/products.html";
});

},2000);

}


// page load pe cart load
loadCart();