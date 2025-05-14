import User from "../model/User.js";
import { sendOTP } from "../config/nodemailer.js";
import crypto from "crypto";

export const requestOTP = async (req, res) => {
       const { AccountNo, AccountHolderName, email,ifscCode } = req.body;
       try {
              let user = await User.findOne({ email });
              if (!user) throw new Error("User not found" );
              if (user.kycVerified) throw new Error("KYC already verified" );
              const otp = crypto.randomInt(100000, 999999).toString();
              user.otp = otp;
              user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
              user.AccountNo = AccountNo;
              user.AccountHolderName = AccountHolderName;
              user.ifscCode = ifscCode;
              await user.save();
              await sendOTP({email, otp});
              res.json({ msg: "OTP sent to email",success:true });
       } catch (error) {
              res.json({ msg: error.message });
       }
};

export const verifyOTP = async (req, res) => {
       const { email, otp } = req.body;
       try {
              const user = await User.findOne({ email });
              if (!user) throw new Error("User not found" );

              if (user.otp !== otp || Date.now() > user.otpExpires) {
                     throw new Error("Invalid or expired OTP" );
              }

              user.kycVerified = true;
              user.otp = null;
              user.otpExpires = null;
              await user.save();

              res.json({ msg: "KYC verification successful",success:true });
       } catch (error) {
              res.json({ msg: error.message });
       }
};
