const { Router } = require("express");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/messages");
const passport = require("passport");

const messages = Router();

messages.post(
  "/:id/:friendId",
  passport.authenticate("jwt", { session: false }),
  sendMessage,
);
messages.get(
  "/:id/:friendId",
  passport.authenticate("jwt", { session: false }),
  getMessages,
);
messages.delete(
  ":messageId",
  passport.authenticate("jwt", { session: false }),
  deleteMessage,
);

module.exports = messages;
