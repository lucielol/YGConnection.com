import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const User = {
  index: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      const response = users.map(({ password, ...user }) => user);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  store: async (req, res) => {},
  show: async (req, res) => {},
  update: async (req, res) => {},
  destroy: async (req, res) => {},
};

export default User;
