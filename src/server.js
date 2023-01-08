import http from "http";
import WebSocket from "ws";
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
const server = http.createServer(app); // express.js로 http 서버 생성
const wss = new WebSocket.Server({ server }); // http 서버 위에 ws 서버 생성

/**
 *
 * @param socket = 연결된 브라우저
 */
wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");

  socket.on("close", () => console.log("Disconnected from the Browser ❎"));
  socket.on("message", (message) => {
    console.log(message.toString("utf8"));
  });
  socket.send("hello!");
});

server.listen(3000, handleListen);
