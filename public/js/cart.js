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