const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "rj7@Vicky16",
  database: "ecommerce",
  port: 3306
});

// connect database
db.connect((err)=>{
  if(err){
    console.log("Database connection failed");
    console.log(err);
  }else{
    console.log("MySQL Connected");
  }
});

// static folders
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

// API to get products
app.get("/products",(req,res)=>{
  db.query("SELECT * FROM products",(err,result)=>{
    if(err){
      res.send(err);
    }else{
      res.json(result);
    }
  });
});

// Register API
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

// Login API
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
app.listen(3000,()=>{
  console.log("Server running on port 3000");
});