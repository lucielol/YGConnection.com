import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Checkout = {
  index: async (req, res) => {
    try {
      const categories = await prisma.category.findMany();
      return res.json(categories);
    } catch (error) {}
  },
  store: async (req, res) => {
    const { name } = req.body;

    try {
      await prisma.category.create({
        data: { name },
      });

      return res.json({
        message: `added category`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  show: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      return res.json({ message: "success update event" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  destroy: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      await prisma.category.delete({ where: { id } });
      return res.json({ message: "success" });
    } catch (error) {
      console.log(error);
    }
  },
};

export default Checkout;
