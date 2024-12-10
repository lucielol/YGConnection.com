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
