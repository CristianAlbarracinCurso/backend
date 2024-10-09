const socket = io();

socket.on("all messages", (data) => {
  data = data
    .map(
      (each) =>
        `<div class="chat">
          <img
            class="chat_avatar"
            src="public/imgUser/userNone.jpg"
          />
          <div class="chat_info">
            <div class="contact_name">${each.username.toUpperCase()} </div>
            <div class="contact_msg">${each.message}
            </div>
          </div>
          <div class="chat_status">
            <div class="chat_date">Usuario</div>
            <div class="chat_new grad_pb">  </div>
          </div>
        </div>`
    )
    .join("");
  document.querySelector("#chat").innerHTML = data;
});

document.querySelector("#text").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const newMessage = document.querySelector("#text").value;
    socket.emit("new message", { username, message: newMessage });
    event.target.value = "";
  }
});
