const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const port = process.env.PORT || 4001;

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", socket => {
  console.log("USer connected");
  socket.on("message", message => {
    io.emit("message", message);
    console.log(message);
  });
  socket.on("disconnected", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log("Server is running");
});
