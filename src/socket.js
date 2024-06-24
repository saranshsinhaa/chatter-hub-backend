const Group = require("./models/Group");
const Message = require("./models/Message");

const handleSocketConnection = (socket, io) => {
  socket.on("joinGroup", async ({ groupId, userId }) => {
    socket.join(groupId);
    io.to(groupId).emit("userJoined", { userId });
  });

  socket.on("leaveGroup", async ({ groupId, userId }) => {
    socket.leave(groupId);
    io.to(groupId).emit("userLeft", { userId });
  });

  socket.on("sendMessage", async ({ groupId, sender, content }) => {
    const message = new Message({ groupId, sender, content });
    await message.save();
    io.to(groupId).emit("newMessage", { message: message.toObject() });
  });

  socket.on("disconnect", () => {
    // Handle user disconnection if needed
  });
};

module.exports = { handleSocketConnection };
