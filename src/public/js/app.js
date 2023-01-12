const socket = io(); // io() = 자동적으로 back-end socket.io와 연결해주는 힘수

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
let roomName;

room.hidden = true;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();

  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You : ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();

  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;

  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();

  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user}님이 입장하셨습니다.`);
});

socket.on("bye", (user) => {
  addMessage(`${user}님이 퇴장하셨습니다.`);
});

socket.on("new_message", addMessage);

/** emit함수(FE) - on함수(BE)
 * 첫번째 인자 : 이벤트의 이름
 * 두번째 인자 : 보내고 싶은 data - 여러 타입으로 여러 개 전송 가능
 * 세번째 인자 : 프론트에서 실행하고 서버에서 호출하는 콜백함수
 */
