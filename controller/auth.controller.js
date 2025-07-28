const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendResponse, handleError } = require("../utils/authUtils");

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      const message =
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists";
      return sendResponse(res, 400, false, message);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { fullname, username, password: hashedPassword, email },
    });

    sendResponse(res, 200, true, "Registration successful");
  } catch (error) {
    handleError(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return sendResponse(res, 404, false, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendResponse(res, 401, false, "Invalid password");
    }

    const payload = {
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    sendResponse(res, 200, true, "Login successful", { token });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { register, login };
