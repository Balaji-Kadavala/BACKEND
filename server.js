var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var fs=require("fs");
var cookieParser=require("cookie-parser")
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static(__dirname + "/public"));
app.listen(4700,()=>{
    console.log("Server is running on port 4700 : http://localhost:4700");
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/home.html");
})
app.post("/login-req",(req,res)=>{
    var {username,password}=req.body;
    var users=JSON.parse(fs.readFileSync("users.txt").toString())
    var present=users.find(u=>u.username===username && u.password===password);
    if(present){
        res.cookie("username",username)
        res.cookie("password",password)
        res.send("Login successful");
    }else{
        res.send("Invalid username or password");
    }
})
app.get("/login",(req,res)=>{
    res.clearCookie("username");
    res.clearCookie("password");
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
    var username=req.cookies?.username;
    var password=req.cookies?.password;
    var users=JSON.parse(fs.readFileSync("users.txt").toString())
    console.log(username,password,users);
    var present=users.find(u=>u.username==username && u.password==password);
    console.log(present);
    if(present){
        next();
    }else{
        res.redirect("/login.html");
    }
}
app.get("/add",(req,res)=>{
    res.send(+req.query.a+ +req.query.b);
})