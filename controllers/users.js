const { prisma } = require("../lib/prisma");

const toggleUserOnline = async (id) => {
  await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      online: true,
    },
  });
};

const toggleUserOffline = async (id) => {
  await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      online: false,
    },
  });
};

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      first_name: true,
      last_name: true,
      avatar: true,
      online: true,
    },
  });
  res.json(users);
};

const getUserInfo = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  res.json({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    online: user.online,
    avatar: user.avatar,
  });
};

const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.PROD ? true : false,
    sameSite: process.env.PROD ? "none" : "lax",
  });
  res.sendStatus(204);
};

module.exports = {
  toggleUserOffline,
  toggleUserOnline,
  getAllUsers,
  logoutUser,
  getUserInfo,
};
