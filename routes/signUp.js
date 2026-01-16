const { Router } = require("express");
const signupController = require("./../controllers/signUp.js");

const signUp = Router();

signUp.post("/", signupController);

module.exports = signUp;
