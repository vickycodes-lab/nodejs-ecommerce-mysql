const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const app = express();

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
app.use(express.static(path.join(__dirname,"views")));

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

app.listen(3000,()=>{
  console.log("Server running on port 3000");
});