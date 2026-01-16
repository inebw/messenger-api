const { prisma } = require("../lib/prisma");

const getMessages = async (req, res) => {
  const { id, friendId } = req.params;
  const messages = await prisma.message.findMany({
    where: {
      senderId: parseInt(id),
      receiverId: parseInt(friendId),
    },
  });
  res.json(messages);
};

const sendMessage = async (req, res) => {
  const { id, friendId } = req.params;
  const { message } = req.body;

  await prisma.message.create({
    data: {
      message,
      senderId: parseInt(id),
      receiverId: parseInt(friendId),
    },
  });

  res.sendStatus(201);
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
