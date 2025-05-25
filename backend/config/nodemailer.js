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

export const sendOTP = async ({email,subject,html}) => {
       const mailOptions = {
              from: process.env.EMAIL,
              to: email,
              subject: subject,
              html: html,
       };
       try {
             const l= await transporter.sendMail(mailOptions);
       } catch (error) {
              console.log(error)
              console.error("❌ Error sending OTP:", error);
       }
};
