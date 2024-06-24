const Message = require("../models/Message");

const getMessages = async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await Message.find({ groupId }).populate(
      "sender",
      "username"
    );
    res.json(messages);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { getMessages };
