const { Router } = require("express");
const {
  getFriends,
  addFriend,
  removeFriend,
} = require("../controllers/friends");

const friends = Router();

friends.get("/:id", getFriends);
friends.post("/:id/:friendId", addFriend);
friends.delete("/:id/:friendId", removeFriend);

module.exports = friends;
