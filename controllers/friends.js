const { prisma } = require("../lib/prisma");

const getFriends = async (req, res) => {
  const { id } = req.params;
  const friends = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      friends: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          username: true,
          avatar: true,
          online: true,
        },
      },
    },
  });
  res.json(friends.friends);
};

const addFriend = async (req, res) => {
  const { id, friendId } = req.params;
  await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      friends: {
        connect: {
          id: parseInt(friendId),
        },
      },
    },
  });
  res.sendStatus(201);
};

const removeFriend = async (req, res) => {
  const { id, friendId } = req.params;
  await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      friends: {
        disconnect: {
          id: parseInt(friendId),
        },
      },
    },
  });
  res.sendStatus(204);
};

module.exports = {
  getFriends,
  addFriend,
  removeFriend,
};
