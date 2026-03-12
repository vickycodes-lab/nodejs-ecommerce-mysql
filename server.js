const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Render PORT fix
const PORT = process.env.PORT || 3000;

// MySQL connection (Railway)
const db = mysql.createConnection(process.env.MYSQL_URL);

// connect database
db.connect((err)=>{
  if(err){
    console.log("Database connection failed");
    console.log(err);
  }else{
    console.log("MySQL Connected");
  }
});

// static folder
app.use(express.static(path.join(__dirname,"public")));

// routes
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

// API get products
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

// start server
app.listen(PORT,()=>{
  console.log("Server running on port " + PORT);
});