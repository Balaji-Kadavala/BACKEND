const express = require("express");
const http = require("http");
const { dirname } = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

let liveCount = 0;
server.listen(2200, () => {
  console.log("Server is running on PORT 2200");
});

io.on("connection", (socket) => {

  liveCount++;
  let liveUsers = [];

  console.log("New connection established:", socket.id)

  io.sockets.sockets.forEach((socket) => {
    liveUsers.push(socket.handshake.auth.username)
  })

  console.log(liveUsers);

  io.emit("userJoinData", { liveCount, username: socket.handshake.auth.username, liveUsers })

  socket.on("sendMsg", (data) => {
    console.log("Messsage ", data.msg, " recieved from ", socket.handshake.auth.username)
    io.emit("userMsg", { username: socket.handshake.auth.username, msg: data.msg });
  })

  socket.on("disconnect", () => {
    liveUsers = [];
    io.sockets.sockets.forEach((socket) => {
      liveUsers.push(socket.handshake.auth.username)
    })
    liveCount--;
    io.emit("userLeftData", { liveCount, username: socket.handshake.auth.username, liveUsers })
  })
})