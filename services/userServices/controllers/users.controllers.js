const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "user phehle se h bhai" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPass,
      },
    });

    res.status(200).json({ message: `user created ${user}` });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  } finally {
    console.log("register block ran");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ message: "user phehle se h bhai" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Password galat h" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  } finally {
    console.log("login block ran");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    res.json({ users });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  } finally {
    console.log("get user block ran");
  }
};

module.exports = { registerUser, getUsers, loginUser };
