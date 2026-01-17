const { Router } = require("express");
const { getAllUsers } = require("../controllers/users");

const users = Router();

users.get("/", getAllUsers);

module.exports = users;
