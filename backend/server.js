const express=require("express");
const app=express();
app.use(express.json());

app.post("/progress",(req,res)=>{
res.send("saved");
});

app.listen(3000);
