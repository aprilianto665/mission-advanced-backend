const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        email,
      },
    });

    res.json({
      status: "success",
      message: "Registration successful",
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  register,
};
