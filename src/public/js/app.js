// 서버와 연결
const socket = new WebSocket(`ws://${window.location.host}`);

/* 각종 listner 등록 */

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message : ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❎");
});

setTimeout(() => {
  socket.send("hello from the browser!!");
}, 10000);
