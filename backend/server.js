const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./database.db");

/* Tables */
db.run(`CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY,
name TEXT,
email TEXT,
password TEXT,
role TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS progress(
id INTEGER PRIMARY KEY,
user_id INTEGER,
course TEXT,
lesson TEXT,
completed INTEGER
)`);

db.run(`CREATE TABLE IF NOT EXISTS trainers(
id INTEGER PRIMARY KEY,
name TEXT,
email TEXT,
course TEXT
)`);

/* Email */
const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:"your@email.com",
pass:"app-password"
}
});

/* Register */
app.post("/register", async (req,res)=>{
const {name,email,password} = req.body;
const hash = await bcrypt.hash(password,10);

db.run(
"INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
[name,email,hash,"student"]
);

transporter.sendMail({
to:email,
subject:"Welcome to SAP Training",
text:"Your account created"
});

res.send("User created");
});

/* Login */
app.post("/login",(req,res)=>{
const {email,password}=req.body;

db.get("SELECT * FROM users WHERE email=?",[email],
async (err,user)=>{

if(!user) return res.status(401).send("Invalid");

const match = await bcrypt.compare(password,user.password);

if(match){
const token = jwt.sign({id:user.id,role:user.role},"secret");
res.json({token,user});
}else{
res.status(401).send("Invalid");
}
});
});

/* Progress */
app.post("/progress",(req,res)=>{
const {user_id,course,lesson,completed}=req.body;

db.run(
"INSERT INTO progress(user_id,course,lesson,completed) VALUES(?,?,?,?)",
[user_id,course,lesson,completed]
);

res.send("Saved");
});

app.listen(3000);
