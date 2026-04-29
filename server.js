const express = require("express");
const app = express();

const connectDB = require("./db");

const FileRouter = require("./routes/file-router")

const dotenv = require("dotenv")
dotenv.config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname+"/uploads"));

app.use("/file",FileRouter)

app.listen(2244, () => {
    console.log("Server is running on port 2244");
})

connectDB();

app.get("/", (req, res) => {
    res.send("Hello!..");
})