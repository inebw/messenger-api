const { body, matchedData, validationResult } = require("express-validator");
const { prisma } = require("../lib/prisma");
const bcrypt = require("bcryptjs");

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username should not be empty")
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          username: value,
        },
      });
      if (user) throw new Error("Username already exists");
      return true;
    }),
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage("First Name should contain only alphabets")
    .isLength({ min: 3, max: 255 })
    .withMessage("First Name should contain at least 3 characters"),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage("First Name should contain only alphabets")
    .isLength({ min: 3, max: 255 })
    .withMessage("Last Name should contain at least 3 characters"),
  body("avatar").trim(),
  body("password")
    .trim()
    .isLength({ min: 8, max: 255 })
    .withMessage("Password should be at least 8 characters long"),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password does not match");
      else return true;
    }),
];

module.exports = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    const { username, firstName, lastName, password, avatar } =
      matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        avatar: `https://robohash.org/${username}${firstName}${lastName}.png?set=set${avatar}`,
      },
    });
    res.sendStatus(201);
  },
];
