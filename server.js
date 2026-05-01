var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var fs=require("fs");
const jwt = require("jsonwebtoken")
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.listen(3600,()=>{
    console.log("Server is running on port 3600 : http://localhost:3600");
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/home.html");
})
app.post("/login-req",(req,res)=>{
    var {username,password}=req.body;
    let user={username};
    var users=JSON.parse(fs.readFileSync("users.txt").toString())
    var present=users.find(u=>u.username===username && u.password===password);
    if(present){
        let token=jwt.sign(user,"secretIsSecret");
        res.send({status:"success",token});
    }else{
        res.send({status:"failed"});
    }
})
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/public/login.html");
})
app.post("/register",(req,res)=>{
    var {username,password}=req.body;
    var users=JSON.parse(fs.readFileSync("users.txt").toString())
    var present=users.find(u=>u.username===username);
    if(present){
        res.send({ status:"failed" });
    }else{
        users.push({ username, password });
        fs.writeFileSync("users.txt", JSON.stringify(users));
        res.send({ status:"success" });
    }
})
app.use(checkCredentials);
function checkCredentials(req,res,next)
{
    const token=req.headers.token;
    if(!token)
        res.send("Invalid token/ token required")
    const udata=jwt.verify(token,"secretIsSecret");
    console.log(udata)
    var users=JSON.parse(fs.readFileSync("users.txt").toString())
    var present=users.find(u=>u.username==udata.username);
    console.log(present);
    if(present){
        next();
    }else{
        res.redirect("/login.html");
    }
}
app.get("/add",(req,res)=>{
    res.send({result:+req.query.a+ +req.query.b});
})
app.get("/load")
app.get("/profile",(req,res)=>{      //...
    res.redirect("/profile-red")
})
app.get("/profile-red",(req,res)=>{
    res.sendFile(__dirname+"/private/profile.html")
})