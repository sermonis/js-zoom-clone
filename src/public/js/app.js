const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

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

function handleSubmit(event) {
  event.preventDefault();

  const input = messageForm.querySelector("input");
  socket.send(input.value); // server로 메시지 보내기
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
