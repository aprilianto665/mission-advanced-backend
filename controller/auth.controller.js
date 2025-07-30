const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendResponse, handleError } = require("../utils/authUtils");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../services/email.service");

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
    const verifyToken = uuidv4();
    await prisma.user.create({
      data: {
        fullname,
        username,
        password: hashedPassword,
        email,
        verifyToken,
      },
    });

    await sendEmail(email, verifyToken);

    sendResponse(
      res,
      200,
      true,
      "Registration successful. Please check your email to verify your account"
    );
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

    if (!user.isVerified) {
      return sendResponse(res, 401, false, "Email is not verified");
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

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    if (!token) {
      return sendResponse(res, 400, false, "Verification token is required");
    }

    const user = await prisma.user.findFirst({ where: { verifyToken: token } });

    if (!user) {
      return sendResponse(res, 400, false, "Invalid verification token");
    }

    if (user.isVerified) {
      return sendResponse(res, 400, false, "Email already verified");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    sendResponse(res, 200, true, "Email verification successful");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { register, login, verifyEmail };
