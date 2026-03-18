const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Render PORT
const PORT = process.env.PORT || 3000;

// MySQL connection (Railway)
let db;
if (process.env.MYSQL_URL) {
  db = mysql.createConnection(process.env.MYSQL_URL);
  
  // connect database
  db.connect((err)=>{
    if(err){
      console.log("Database connection failed");
      console.log(err);
    }else{
      console.log("MySQL Connected");
    }
  });
} else {
  console.log("No MYSQL_URL defined. Running without database connection.");
  // Provide a dummy db object so the app doesn't crash on db.query later
  db = {
    query: (query, params, callback) => {
      if (typeof params === 'function') {
        callback = params;
      }
      if (callback) callback(new Error("Database offline"), []);
    }
  };
}

// static folder
app.use(express.static(path.join(__dirname,"public")));
app.use("/public", express.static(path.join(__dirname,"public")));


// ================= ROUTES =================

// home
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"views","index.html"));
});

app.get("/products.html",(req,res)=>{
  res.sendFile(path.join(__dirname,"views","products.html"));
});

app.get("/cart.html",(req,res)=>{
  res.sendFile(path.join(__dirname,"views","cart.html"));
});

app.get("/login.html",(req,res)=>{
  res.sendFile(path.join(__dirname,"views","login.html"));
});

app.get("/register.html",(req,res)=>{
  res.sendFile(path.join(__dirname,"views","register.html"));
});

app.get("/add-product.html",(req,res)=>{
  res.sendFile(path.join(__dirname,"views","add-product.html"));
});

app.get("/orders.html",(req,res)=>{
  res.sendFile(path.join(__dirname,"views","orders.html"));
});


// ================= API =================

// get products
app.get("/products",(req,res)=>{
  db.query("SELECT * FROM products",(err,result)=>{
    if(err){
      console.log(err);
      res.send("Database error");
    }else{
      res.json(result);
    }
  });
});


// add product
app.post("/add-product",(req,res)=>{

  const {name,price,image} = req.body;

  db.query(
    "INSERT INTO products (name,price,image) VALUES (?,?,?)",
    [name,price,image],
    (err,result)=>{

      if(err){
        console.log(err);
        res.send("Error adding product");
      }else{
        res.send("Product Added Successfully");
      }

    }
  );

});


// ================= CART SYSTEM =================

// add to cart
app.post("/add-to-cart",(req,res)=>{

  console.log("BODY:", req.body); // 

  const {user_id,product_id,quantity} = req.body;

  db.query(
    "INSERT INTO cart (user_id,product_id,quantity) VALUES (?,?,?)",
    [user_id,product_id,quantity],
    (err)=>{
      if(err){
        console.log("DB ERROR:", err); 
        res.send("Cart Error");
      }else{
        res.send("Product Added To Cart");
      }
    }
  );

});


// load cart
app.get("/cart/:user_id",(req,res)=>{

  const user_id = req.params.user_id;

  db.query(
    `SELECT products.id,products.name,products.price,products.image,cart.quantity
     FROM cart
     JOIN products ON cart.product_id = products.id
     WHERE cart.user_id=?`,
    [user_id],
    (err,result)=>{

      if(err){
        console.log(err);
        res.send("Cart Load Error");
      }else{
        res.json(result);
      }

    }
  );

});


// ================= USER =================

// register
app.post("/register",(req,res)=>{

  const {name,email,password} = req.body;

  db.query(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [name,email,password],
    (err,result)=>{

      if(err){
        console.log(err);
        res.send("Registration Failed");
      }else{
        res.send("User Registered Successfully");
      }

    }
  );

});


// login
app.post("/login",(req,res)=>{

  const {email,password} = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email,password],
    (err,result)=>{

      if(err){
        console.log(err);
        res.send("Login Error");
      }else if(result.length > 0){
        res.send("Login Successful");
      }else{
        res.send("Invalid Email or Password");
      }

    }
  );

});

app.post("/place-order",(req,res)=>{

const user_id = 1;

db.query(
"SELECT cart.*, products.price FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id=?",
[user_id],
(err,cartItems)=>{

if(err) return res.send("Error");

let total = 0;

cartItems.forEach(item=>{
total += item.price * item.quantity;
});

db.query(
"INSERT INTO orders (user_id,total_price) VALUES (?,?)",
[user_id,total],
(err,orderResult)=>{

if(err) return res.send("Order Error");

const order_id = orderResult.insertId;



db.query("DELETE FROM cart WHERE user_id=?",[user_id],()=>{

res.send("Order Placed Successfully");

});

});

});


// start server
app.listen(PORT,()=>{
  console.log("Server running on port " + PORT);
});