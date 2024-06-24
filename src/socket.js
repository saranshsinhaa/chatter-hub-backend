const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("joinGroup", ({ groupId, token }) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return;
        socket.join(groupId);
        console.log(`User ${user.username} joined group ${groupId}`);
      });
    });

    socket.on("leaveGroup", ({ groupId, token }) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return;
        socket.leave(groupId);
        console.log(`User ${user.username} left group ${groupId}`);
      });
    });

    socket.on("sendMessage", ({ groupId, token, content }) => {
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return;

        try {
          const message = new Message({
            groupId,
            sender: user.id,
            content,
          });
          await message.save();

          io.to(groupId).emit("newMessage", {
            sender: {
              username: user.username,
              _id: user.id,
            },
            content,
          });
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
};
