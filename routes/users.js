const { Router } = require("express");
const {
  getAllUsers,
  logoutUser,
  getUserInfo,
} = require("../controllers/users");
const passport = require("passport");

const users = Router();

users.get("/", passport.authenticate("jwt", { session: false }), getAllUsers);
users.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logoutUser,
);
users.get("/user/:id", getUserInfo);

module.exports = users;
