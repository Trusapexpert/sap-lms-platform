const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"sap_lms"
});

app.post("/login",(req,res)=>{
const {username,password}=req.body;

db.query(
"SELECT * FROM users WHERE username=? AND password=?",
[username,password],
(err,result)=>{
if(result.length>0){
res.json({success:true,role:result[0].role})
}else{
res.json({success:false})
}
});
});

app.listen(3000);
