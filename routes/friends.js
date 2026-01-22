const { Router } = require("express");
const {
  getFriends,
  addFriend,
  removeFriend,
} = require("../controllers/friends");
const passport = require("passport");

const friends = Router();
friends.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getFriends,
);
friends.post(
  "/:id/:friendId",
  passport.authenticate("jwt", { session: false }),
  addFriend,
);
friends.delete(
  "/:id/:friendId",
  passport.authenticate("jwt", { session: false }),
  removeFriend,
);

module.exports = friends;
