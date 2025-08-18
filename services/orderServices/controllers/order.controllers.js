const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  try {
    const { items, userId: bodyUserId } = req.body;
    const userId =
      req.user.role === "ADMIN" && bodyUserId ? bodyUserId : req.user.id;

    const order = await prisma.order.create({
      data: {
        userId,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true, user: true },
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
    });
    res.json(orders);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { items: true, user: true },
    });

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json({ message: "Order updated successfully", order });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Order deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
