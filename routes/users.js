const { Router } = require("express");
const { getAllUsers, logoutUser } = require("../controllers/users");

const users = Router();

users.get("/", getAllUsers);
users.get("/logout", logoutUser);

module.exports = users;
