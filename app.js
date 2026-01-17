require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const login = require("./routes/login");
const signUp = require("./routes/signUp");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const friends = require("./routes/friends");
const messages = require("./routes/messages");
const { getMessages, sendMessage } = require("./controllers/messages");
const { toggleUserOnline, toggleUserOffline } = require("./controllers/users");
const users = require("./routes/users");

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

require("./config/passport")(passport);

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    toggleUserOnline(data);
    socket.data.id = data;
  });

  socket.on("postMessage", async (data) => {
    try {
      if (data.message) await sendMessage(data.id, data.friendId, data.message);
      const messages = await getMessages(data.id, data.friendId);
      socket.emit("getMessage", messages);
      socket.to(data.friendId).emit("getMessage", messages);
    } catch (err) {}
  });

  socket.on("disconnect", (data) => {
    if (socket.data.id) toggleUserOffline(socket.data.id);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", login);
app.use("/sign-up", signUp);
app.use("/friends", friends);
app.use("/messages", messages);
app.use("/users", users);

server.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on port: ${port}`);
});
