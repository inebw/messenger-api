const { prisma } = require("../lib/prisma");

const getMessages = async (id, friendId) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { AND: [{ senderId: id }, { receiverId: friendId }] },
        { AND: [{ senderId: friendId }, { receiverId: id }] },
      ],
    },
    orderBy: {
      id: "asc",
    },
  });
  return messages;
};

const sendMessage = async (id, friendId, message) => {
  await prisma.message.create({
    data: {
      message,
      senderId: parseInt(id),
      receiverId: parseInt(friendId),
    },
  });
};

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  await prisma.message.delete({
    where: {
      id: parseInt(messageId),
    },
  });
  res.sendStatus(204);
};

module.exports = {
  getMessages,
  sendMessage,
  deleteMessage,
};
