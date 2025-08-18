const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
      },
    });
    res.status(200).json({ message: "Product created succesfully: ", product });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  } finally {
    console.log("create product block ran");
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      include: { category: true },
    });
    res.json(product).status(200);
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  } finally {
    console.log("get all product block ran");
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, stock, categoryId },
    });

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "product deleted" });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  } finally {
    console.log("get all product block ran");
  }
};
module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
