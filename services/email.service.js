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

const sendEmail = (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_SERVER,
    to: email,
    subject: "Email address verification",
    html: "<p>Test email</p>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
