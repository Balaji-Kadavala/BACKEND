const express = require("express");
const app = express();

const connectDB = require("./db");

const TodoRouter = require("./routes/todo-router")
const UserRouter = require("./routes/user-router")

const dotenv = require("dotenv")
dotenv.config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(express.static(__dirname + "/public"));

app.use("/todos",TodoRouter)
app.use("/users",UserRouter)

app.listen(2026, () => {
    console.log("Server is running on port 2026");
})

connectDB();

app.get("/", (req, res) => {
    res.send("Hello!..");
})