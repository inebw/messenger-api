const { Router } = require("express");
const loginController = require("./../controllers/login.js");
const passport = require("passport");
const login = Router();

login.post("/", loginController);

login.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "This is the protected route:" });
  },
);

module.exports = login;
