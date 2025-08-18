const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid token format" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: <userId> }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { authenticate, isAdmin };
