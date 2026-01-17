const { prisma } = require("../lib/prisma");

const toggleUserOnline = async (id) => {
  console.log(id);
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
  const users = await prisma.user.findMany();
  res.json(users);
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
};
