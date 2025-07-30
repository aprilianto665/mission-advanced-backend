const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (email, token) => {
  const verifyUrl = `${
    process.env.BASE_URL || "http://localhost:3000"
  }/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_SERVER,
    to: email,
    subject: "Email address verification",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Email Verification</h2>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verifyUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0;">Verify Email</a>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${verifyUrl}</p>
        <p style="color: #999; font-size: 12px;">This link will expire in 24 hours.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = { sendEmail };
