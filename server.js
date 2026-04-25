const express = require("express");
const app = express();
const connectDB = require("./db");
const TodoModel = require("./model/todo-model");
const UserModel = require("./model/user-model");
const dotenv = require("dotenv")
dotenv.config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(express.static(__dirname + "/public"));
app.listen(2026, () => {
    console.log("Server is running on port 2026");
})

connectDB();

app.get("/", (req, res) => {
    res.send("Hello!..");
})

app.post("/submit/user", (req, res) => {
    var newUser = new UserModel({ ...req.body })
    newUser.save();
    res.send("User added into the DB!")
})

app.post("/submit/todo", (req, res) => {
    var newTodo = new TodoModel({ title:req.body.title, status:false, timeStamp: new Date() })
    newTodo.save();
    res.redirect("/todoform.html")
})

app.get("/todos",(req,res)=>{
    TodoModel.find()
    .then((data)=>{
        res.send(data);
    })
})

app.get("/delete-todo/:id",(req,res)=>{
    TodoModel.findByIdAndDelete(req.params.id)
    .then((status)=>{
        res.send(status)
    })
})