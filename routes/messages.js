const { Router } = require("express");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messages");

const messages = Router();

messages.post("/:id/:friendId", sendMessage);
messages.get("/:id/:friendId", getMessages);
messages.delete(":messageId", deleteMessage);

module.exports = messages;
