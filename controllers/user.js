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

module.exports = {
  toggleUserOffline,
  toggleUserOnline,
};
