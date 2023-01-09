import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

// views 설정 및 render
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// http, ws 서버 둘다 돌리기 가능
const httpServer = http.createServer(app); // express.js로 http 서버 생성
// const wss = new WebSocket.Server({ server }); // http 서버 위에 ws 서버 생성
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

/**
 * WebSocket으로 채팅 구현
 * 
 * const sockets = []; // 연결될 여러 브라우저를 넣을 배열

// socket = 연결된 브라우저
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "익명";
  console.log("Connected to Browser ✅");

  socket.on("close", () => console.log("Disconnected from the Browser ❎"));
  socket.on("message", (data) => {
    const message = JSON.parse(data);

    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
        break;
      case "nickname":
        socket["nickname"] = message.payload;
        break;
    }
  });
});
 */

httpServer.listen(3000, handleListen);
