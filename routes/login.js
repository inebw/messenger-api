const { Router } = require("express");
const loginController = require("./../controllers/login.js");
const passport = require("passport");
const login = Router();

login.post("/", loginController);

login.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      firstName: req.user.first_name,
      lastName: req.user.last_name,
    });
  },
);

module.exports = login;
