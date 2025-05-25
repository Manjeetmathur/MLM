import User from "../model/User.js";
import { sendOTP } from "../config/nodemailer.js";
import crypto from "crypto";

export const requestOTP = async (req, res) => {
  const { AccountNo, AccountHolderName, email, ifscCode } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    if (user.kycVerified) throw new Error("KYC already verified");

    const otp = crypto.randomInt(100000, 999999).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    user.accountNo = AccountNo;
    user.accountHolderName = AccountHolderName;
    user.ifscCode = ifscCode;
    await user.save();

    // OTP Email Content
    const otpEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(to right, #4f46e5, #7c3aed); padding: 20px; text-align: center;">
         <div className="flex items-center space-x-2  rounded-lg shadow-"> 
                     <img src="https://i.postimg.cc/3J0QKbRh/IMG-20250524-020910.png" alt="" className='w-[40px]  text-2xl rounded-lg ' style=" width:70px; padding: 5px; text-align: center;" />
                     <h1>
                       Dream
                       <span style="colour:yellow">
                         Pay
                       </span>
                     </h1>
         
                   </div>
         
        </div>
        <!-- Body -->
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; text-align: center;">Your OTP for KYC Verification</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Hello ${user.name || 'Valued Customer'},<br/><br/>
            You have requested an OTP to complete your KYC verification. Please use the following OTP to proceed:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 6px; letter-spacing: 2px;">
              ${otp}
            </span>
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            This OTP is valid for <strong>10 minutes</strong>. If you did not request this, please contact our support team immediately.
          </p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Account Holder:</strong> ${AccountHolderName}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Account Number:</strong> ${AccountNo}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>IFSC Code:</strong> ${ifscCode}</p>
          </div>
        </div>
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Need help? Contact us at <a href="mailto:support@example.com" style="color: #4f46e5; text-decoration: none;">support@example.com</a></p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendOTP({ email, subject: "Your OTP for KYC Verification", html: otpEmailContent });

    res.json({ msg: "OTP sent to email", success: true });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      throw new Error("Invalid or expired OTP");
    }

    user.kycVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Congratulatory Email Content
    const congratsEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(to right, #4f46e5, #7c3aed); padding: 20px; text-align: center;">
            <div className="flex items-center space-x-2  rounded-lg shadow-"> 
                     <img src="https://i.postimg.cc/3J0QKbRh/IMG-20250524-020910.png" alt="" className='w-[40px]  text-2xl rounded-lg ' style=" width:70px; padding: 5px; text-align: center;" />
                     <h1>
                       Dream
                       <span style="colour:yellow">
                         Pay
                       </span>
                     </h1>
         
                   </div>
         
        </div>
        <!-- Body -->
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; text-align: center;">
            Congratulations! KYC Verified 🎉
          </h2>
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://i.postimg.cc/TYtChnkc/verified-badge-medal-label-green-white-with-checkmark-symbol-469478-94.png" alt="Checkmark" style="width: 80px; height: 80px; " />
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Hello ${user.name || 'Valued Customer'},<br/><br/>
            We’re thrilled to inform you that your KYC verification has been successfully completed!
          </p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Account Holder:</strong> ${user.AccountHolderName}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Account Number:</strong> ${user.AccountNo}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>IFSC Code:</strong> ${user.ifscCode}</p>
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            You can now fully access all features of your account. Thank you for choosing us!
          </p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Need help? Contact us at <a href="mailto:support@example.com" style="color: #4f46e5; text-decoration: none;">support@example.com</a></p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendOTP({ email, subject: "KYC Verification Successful", html: congratsEmailContent });

    res.json({ msg: "KYC verification successful", success: true });
  } catch (error) {
    res.json({ msg: error.message });
  }
};