import nodemailer from "nodemailer";

const nodeMailer = async (email: string, name: string) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL as String,
      pass: process.env.SMTP_PASSWORD as String,
    },
  });

  console.log(process.env.SMTP_EMAIL, process.env.SMTP_PASSWORD)

  const otp = Math.floor(Math.random() * 99999999);

  const mailOptions = {
    from: "<privatething789736@gmail.com>",
    to: email,
    subject: "verification",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #0066cc;">Hello ${name},</h2>
      <p>Thank you for choosing <strong>Ecommerce</strong>! To proceed with your sign up process, please use the One-Time Password (OTP) provided below.</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <p style="font-size: 18px; color: #444;">Your OTP Code:</p>
        <h1 style="color: #ff6600; font-size: 32px; letter-spacing: 4px;">${otp}</h1>
      </div>

      <p>If you did not request this OTP, please ignore this message or <a href="mohdsameer789736@gmail.com" style="color: #0066cc;">contact our support team</a>.</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="font-size: 14px; color: #555;">Thank you for choosing us<br>
      Best Regards,<br>
      <strong>The [Website Name] Team</strong></p>
      
      <p style="font-size: 12px; color: #999;">Note: Never share your OTP with anyone. We will never ask for your OTP through email, phone, or any other platform.</p>
    </div>
  `,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error is sending the mail", err);
    } else {
      console.log("Email is sent successfully : ", info);
    }
  });

  return otp;
};

export { nodeMailer };
