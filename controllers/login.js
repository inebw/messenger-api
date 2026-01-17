const { body, matchedData, validationResult } = require("express-validator");
const { prisma } = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username should not be empty"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Passowrd should be at least 8 characters"),
];

module.exports = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    else {
      const { username, password } = matchedData(req);
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) return res.status(401).json({ msg: "User not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) res.status(401).json({ msg: "Invalid password entered" });

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.PROD ? true : false,
        sameSite: process.env.PROD ? "none" : "lax",
      });
      res.json({
        id: user.id,
        username: user.username,
        firstName: user.first_name,
        lastname: user.last_name,
      });
    }
  },
];
