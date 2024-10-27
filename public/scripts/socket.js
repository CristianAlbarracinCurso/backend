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
        <div class="contact_name">${
          each.name ? each.name.toUpperCase() : "Anónimo"
        }</div>
        <div class="contact_msg">${each.message}</div>
      </div>
          <div class="contact_msg">
            <div >${each.timestamp || ""}</div>
          </div>
        </div>`
    )
    .join("");
  document.querySelector("#chat").innerHTML = data;
});

document.querySelector("#text").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const newMessage = document.querySelector("#text").value;
    const timestamp = new Date().toLocaleTimeString();
    socket.emit("new message", {
      name: username,
      message: newMessage,
      timestamp,
    });
    event.target.value = "";
  }
});
