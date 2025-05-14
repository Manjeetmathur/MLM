import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
       path:"./.env"
});

const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
       },
});

export const sendOTP = async ({email, otp,subject,text}) => {
       const mailOptions = {
              from: process.env.EMAIL,
              to: email,
              subject: subject || "Your KYC OTP Verification Code",
              text: text || `Your OTP for KYC verification is: ${otp}. This OTP is valid for 10 minutes.`,
       };

       try {
              await transporter.sendMail(mailOptions);
       } catch (error) {
              console.error("❌ Error sending OTP:", error);
       }
};
