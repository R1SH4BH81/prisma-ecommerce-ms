const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fake payment processing
const processPayment = async (req, res) => {
  try {
    const { orderId, amount, method } = req.body;

    const isSuccess = Math.random() > 0.2;
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount,
        status: isSuccess ? "SUCCESS" : "FAILED",
      },
    });

    if (isSuccess) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID" },
      });
    }

    res.json({
      message: isSuccess ? "Payment successful ✅" : "Payment failed ❌",
      payment,
    });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getPaymentByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { orderId: parseInt(orderId) },
    });

    if (!payment) return res.status(404).json({ error: "Payment not found" });

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  processPayment,
  getPaymentByOrder,
};
