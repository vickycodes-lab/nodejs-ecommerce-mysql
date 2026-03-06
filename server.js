// const express = require("express");

// const app = express();

// app.use(express.static("views"));

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce"
});

db.connect((err)=>{
  if(err){
    console.log("Database connection failed");
  }else{
    console.log("Database connected");
  }
});

app.listen(3000, ()=>{
  console.log("Server running on port 3000");
});