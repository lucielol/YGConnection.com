import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Member = {
  index: async (req, res) => {
    try {
      const members = await prisma.member.findMany();
      return res.json(members);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  store: async (req, res) => {
    const { name, artistId, birthDate, image, description } = req.body;

    try {
      await prisma.member.create({
        data: {
          name,
          artistId,
          birthDate: new Date(birthDate),
          image,
          description,
        },
      });

      return res.json({ message: "added member success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  show: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const member = await prisma.member.findUnique({ where: { id } });

      if (!member) {
        return res.status(404).json({ message: "member not found" });
      }

      return res.json(member);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const { name, artistId, birthDate, image, description } = req.body;

      await prisma.member.update({
        where: { id },
        data: {
          name,
          artistId,
          birthDate: new Date(birthDate),
          image,
          description,
        },
      });

      return res.json({ message: "update member success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  destroy: async (req, res) => {},
};

export default Member;
