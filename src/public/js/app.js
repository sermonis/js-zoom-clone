const socket = io(); // io() = 자동적으로 back-end socket.io와 연결해주는 힘수

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone() {
  console.log("backend Done!!");
}

function handleRoomSubmit(event) {
  event.preventDefault();

  const input = form.querySelector("input");
  /** emit함수(FE) - on함수(BE)
   * 첫번째 인자 : 이벤트의 이름
   * 두번째 인자 : 보내고 싶은 data - 여러 타입으로 여러 개 전송 가능
   * 세번째 인자 : 프론트에서 실행하고 서버에서 호출하는 콜백함수
   */
  socket.emit("enter_room", input.value, backendDone);
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
