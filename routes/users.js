const { Router } = require("express");
const {
  getAllUsers,
  logoutUser,
  getUserInfo,
} = require("../controllers/users");

const users = Router();

users.get("/", getAllUsers);
users.get("/logout", logoutUser);
users.get("/user/:id", getUserInfo);

module.exports = users;
