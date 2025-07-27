const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      const message = existingUser.username === username 
        ? "Username already exists" 
        : "Email already exists";
      return res.status(400).json({ status: "error", message });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { fullname, username, password: hashedPassword, email },
    });

    res.json({ status: "success", message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ status: "error", message: "Invalid password" });
    }

    const payload = { fullname: user.fullname, username: user.username, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ status: "success", message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { register, login };
