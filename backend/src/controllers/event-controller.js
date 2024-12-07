import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Event = {
  index: async (req, res) => {
    try {
      const events = await prisma.event.findMany();
      return res.json(events);
    } catch (error) {}
  },
  store: async (req, res) => {
    const { artistId, name, description, date, location } = req.body;

    try {
      await prisma.event.create({
        data: {
          artistId,
          name,
          description,
          date: new Date(date),
          location,
        },
      });

      return res.json({ message: "added event success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  show: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const event = await prisma.event.findUnique({ where: { id } });

      if (!event) {
        return res.status(404).json({ message: "event not found" });
      }

      return res.json(event);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const { name, description, date, location } = req.body;

      await prisma.event.update({
        where: { id },
        data: { name, description, date: new Date(date), location },
      });

      return res.json({ message: "success update event" });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  destroy: async (req, res) => {},
};

export default Event;
