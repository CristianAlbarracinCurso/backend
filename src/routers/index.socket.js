import { socketServer } from "../../server.js";

let allMessages = [
  {
    name: "Server",
    message: "Bienvenidos",
  },
];

const socketCb = (socket) => {
  console.log(socket.id);
  socket.emit("all messages", [...allMessages].reverse().slice(0, 7).reverse());
  socket.on("new message", (data) => {
    allMessages.push(data);
    socketServer.emit(
      "all messages",
      [...allMessages].reverse().slice(0, 7).reverse()
    );
  });
};
export default socketCb;
