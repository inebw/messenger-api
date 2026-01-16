require("dotenv").config();
const express = require("express");
const login = require("./routes/login");
const signUp = require("./routes/signUp");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const friends = require("./routes/friends");
const messages = require("./routes/messages");

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());

require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", login);
app.use("/sign-up", signUp);
app.use("/friends", friends);
app.use("/messages", messages);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on port: ${port}`);
});
