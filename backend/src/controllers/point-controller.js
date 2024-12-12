import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Point = {
  index: async (req, res) => {
    const userId = Number(req.params.userId);
    try {
      const points = await prisma.point.findMany({
        where: { userId },
        select: { value: true },
      });

      const totalPoint = points.reduce((sum, point) => sum + point.value, 0);

      return res.json(totalPoint);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something when wrong." });
    }
  },
};

export default Point;
