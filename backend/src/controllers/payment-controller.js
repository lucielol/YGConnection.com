import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Payment = {
  index: async (req, res) => {},
  store: async (req, res) => {
    const { transactionId, orderId, provider, amount, currency } = req.body;

    try {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "completed",
          paymentStatus: "paid",
        },
      });

      await prisma.transactions.update({
        where: { id: transactionId },
        data: { status: "completed" },
      });

      await prisma.order.updateMany({
        where: { id: orderId },
        data: { status: "completed" },
      });

      const payment = await prisma.payment.create({
        data: {
          transactionId,
          provider,
          amount,
          currency,
          status: "completed",
        },
      });

      const orderItems = await prisma.order.findMany({
        where: {
          id: orderId,
          status: "completed",
          paymentStatus: "paid",
        },
        include: { product: true },
      });

      let totalPoint = 0;
      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        if (item.product.point) {
          totalPoint += item.product.point;
        }
      }

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: { userId: true },
      });

      if (order && order.userId && totalPoint > 0) {
        await prisma.point.create({
          data: {
            userId: order.userId,
            value: totalPoint,
          },
        });
      }

      res.status(200).json({ success: true, payment });
    } catch (error) {
      console.error("Error processing payment:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  show: async (req, res) => {},
  update: async (req, res) => {},
  destroy: async (req, res) => {},
};

export default Payment;
