import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Transaction = {
  index: async () => {},
  store: async (req, res) => {
    const { userId, orderId, amount, paymentMethod } = req.body;

    try {
      // Membuat transaksi dengan status 'pending'
      const transaction = await prisma.transactions.create({
        data: {
          userId,
          orderId,
          amount,
          paymentMethod,
          status: "pending", // Status transaksi awal
        },
      });

      const updateOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "processing", // Status diubah sesuai kebutuhan
          paymentStatus: "processing",
        },
      });

      res.status(201).json({
        success: true,
        message: "Transaction created and updated successfully",
        order: updateOrder,
        transactionId: transaction.id,
        orderId,
      });
    } catch (error) {
      console.error("Error creating transaction", error);
      res.status(500).json({
        success: false,
        message: "Error creating transaction",
      });
    }
  },

  show: async (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL

    try {
      const transaction = await prisma.transactions.findUnique({
        where: { id: Number(id) }, // Mencari transaksi berdasarkan ID
      });

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
        });
      }

      res.status(200).json({
        success: true,
        transaction,
      });
    } catch (error) {
      console.error("Error fetching transaction", error);
      res.status(500).json({
        success: false,
        message: "Error fetching transaction",
      });
    }
  },

  update: async () => {},
  destroy: async () => {},
};

export default Transaction;
