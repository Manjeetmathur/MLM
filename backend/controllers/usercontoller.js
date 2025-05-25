
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTP } from "../config/nodemailer.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
       const { name, email, password, referredBy, phoneNo } = req.body;
       try {
              let user = await User.findOne({ email });
              if (user) throw new Error("User already exists");

              const hashedPassword = await bcrypt.hash(password, 10);
              const referralCode = "DP" + Math.random().toString(36).substr(2, 6);
              let balance = 0;
              if (referredBy) {
                     balance = 100;
              } else {
                     balance = 50;
              }

              user = await User.create({ name, email, password: hashedPassword, referredBy, referralCode, balance, phoneNo });
              // Congratulatory Email Content
              const welcomeEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(to right, #4f46e5, #7c3aed); padding: 20px; text-align: center;">
          <div className="flex items-center space-x-2  rounded-lg shadow-"> 
                      <img src={p1} alt="" className='w-[40px]  text-2xl rounded-lg ' />
                      <h1 className="text-4xl md:text-5xl font-extrabold text-white transition-colors duration-300 drop-shadow-xl group-hover:text-yellow-300 ">
                        Dream<span className="text-4xl md:text-5xl font-extrabold text-yellow-300 transition-colors duration-300 drop-shadow-xl group-hover:text-yellow-300 ">
                          Pay
                        </span>
                      </h1>
          
                    </div>
          
        </div>
        <!-- Body -->
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; text-align: center;">
            Welcome, ${name}! Your Registration is Successful 🎉
          </h2>
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://via.placeholder.com/80x80?text=✓" alt="Checkmark" style="width: 80px; height: 80px;" />
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Hello ${name},<br/><br/>
            Congratulations on joining our platform! We're excited to have you on board. Here are your account details:
          </p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Phone Number:</strong> ${phoneNo}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Referral Code:</strong> ${referralCode}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Initial Balance:</strong> ₹${balance.toLocaleString()}</p>
            ${referredBy ? `<p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Referred By:</strong> ${referredBy}</p>` : ''}
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            You can now log in to your account and start exploring. Use your referral code to invite friends and earn more rewards!
          </p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Need help? Contact us at <a href="mailto:support@example.com" style="color: #4f46e5; text-decoration: none;">support@example.com</a></p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;
              await sendOTP({ email: 'dreampay.help@gmail.com', subject: "Welcome to Our Platform!", html: welcomeEmailContent });

              await sendOTP({ email: user?.email, subject: "Welcome to Our Platform!", html: welcomeEmailContent });
              res.json({ success: true, msg: "User registered successfully" });
       } catch (error) {
              console.log(error)
              res.json({ msg: "Server Error" ,error:error.message});
       }
};

export const login = async (req, res) => {
       const { email, password } = req.body;
       try {
              const user = await User.findOne({ email });
              if (!user) throw new Error("Invalid Credentials");
              // console.log(user)
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) throw new Error("Invalid Credentials");
              const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
              res.cookie("token", token, {
                     httpOnly: true,
                     sameSite: "none",
                     secure: true,
                     maxAge: 24 * 60 * 60 * 1000 // 1 day
              });
              if (user.email == 'kumanjeet779@gmail.com' || user.email == 'dreampay.help@gmail.com' ) {
                     res.json({ success: true, msg: "Login successful", admin: true });
              } else {
                     res.json({ success: true, msg: "Login successful", success: true });
              }
       } catch (error) {
              res.json({ msg: error.message })
       }
};

export const logout = (req, res) => {
       res.cookie("token", "", { expires: new Date(0) });
       res.json({ success: true, msg: "Logged out successfully", success: true });
};

export const getUserbyId = async (req, res) => {
       try {
              const { id } = req.query
              const user = await User.findById(id);
              if (!user) {
                     throw new Error("user not fount")
              }
              res.json({ success: true, user, success: true });
       } catch (error) {
              res.json({ msg: "Server Error" });
       }
};
export const getReferrals = async (req, res) => {
       try {
              const user = await User.findById(req.user.userId);
              const referrals = await User.find({ referredBy: user.referralCode });

              res.json({ success: true, referrals, success: true });
       } catch (error) {
              res.json({ msg: "Server Error" });
       }
};

export const getProfile = async (req, res) => {
       try {
              const user = await User.findById(req.user.userId);
              await user.populate('paymentScreenshots')
              await user.populate('plans')
              res.json({ success: true, user });
       } catch (error) {
              res.json({ msg: "Server Error" });
       }
};
export const deposit = async (req, res) => {
       const { amount } = req.body;
       try {
              const user = await User.findById(req.user.userId);
              user.balance += amount;
              await user.save();

              res.json({ success: true, msg: "Deposit successful", balance: user.balance });
       } catch (error) {
              res.json({ msg: "Server Error" });
       }
};

// export const withdraw = async (req, res) => {
//        const { amount } = req.body;
//        try {
//               const user = await User.findById(req.user.userId);
//               console.log(user)
//               if (user.plans.length < 1) {
//                      throw new Error("For first withdraw You have buy to at least one package")
//               }

//               if (user.balance < amount) {
//                      throw new Error("Insufficient Balance");
//               }

//               user.balance -= amount;
//               await user.save();

//               res.json({ success: true, msg: "Withdrawal successful", balance: user.balance });
//        } catch (error) {
//               res.json({ msg: "Server Error" });
//        }
// };
// export const uploadPaymentScreenshot = async (req, res) => {
//        try {
//               const { userId } = req.params;

//        } catch (error) {
//               res.json({ message: "Server error", error });
//        }
// };

export const withdrawMoney = async (req, res) => {
       try {
              const { userId } = req.params;
              const { money } = req.body;

              const user = await User.findById(userId);
              if (!user) {
                     return res.status(404).json({ message: "User not found", success: false });
              }
              if (user.plans.length < 1) {
                     return res.status(400).json({
                            message: "You must purchase at least one package to withdraw",
                            success: false,
                     });
              }
              if (user.balance < money) {
                     return res.status(400).json({ message: "Insufficient balance", success: false });
              }

              // Atomic update for withdrawMoney and balance
              const withdrawalId = new mongoose.Types.ObjectId();
              const updatedUser = await User.findByIdAndUpdate(
                     userId,
                     {
                            $push: {
                                   withdrawMoney: {
                                          money,
                                          withdrawDate: new Date(),
                                          status: "pending", // Add status for tracking
                                          withdrawalId, // Unique ID for withdrawal
                                   },
                            },
                            $inc: { balance: -money }, // Atomic balance deduction
                     },
                     { new: true }
              );

              if (!updatedUser) {
                     return res.status(404).json({ message: "User not found", success: false });
              }

              // HTML email template
              const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1f2937; color: #e5e7eb; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4f46e5; font-size: 24px;">Dream Pay</h1>
          <p style="color: #9ca3af; font-size: 14px;">Your Trusted MLM Platform</p>
        </div>
        <div style="background-color: #374151; padding: 20px; border-radius: 8px;">
          <h2 style="color: #ffffff; font-size: 20px; margin-bottom: 10px;">Withdrawal Request</h2>
          <p style="color: #d1d5db; font-size: 16px; margin-bottom: 15px;">
            A withdrawal request has been initiated for your account. Below are the details:
          </p>
          <table style="width: 100%; color: #d1d5db; font-size: 14px; margin-bottom: 15px;">
            <tr>
              <td style="padding: 5px;"><strong>User ID:</strong></td>
              <td style="padding: 5px;">${userId}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Email:</strong></td>
              <td style="padding: 5px;">${user.email}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Amount:</strong></td>
              <td style="padding: 5px;">₹${money.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Withdrawal ID:</strong></td>
              <td style="padding: 5px;">${withdrawalId}</td>
            </tr>
            <tr>
              <td style="padding: 5px;"><strong>Request Time:</strong></td>
              <td style="padding: 5px;">${new Date().toLocaleString("en-US", {
                     weekday: "long",
                     year: "numeric",
                     month: "long",
                     day: "numeric",
                     hour: "numeric",
                     minute: "numeric",
                     second: "numeric",
                     timeZoneName: "short",
              })}</td>
            </tr>
          </table>
          <p style="color: #d1d5db; font-size: 14px; margin-bottom: 15px;">
            This withdrawal will be processed within 24 hours. If you did not initiate this request, 
            please contact our support team immediately.
          </p>
          <a
            href="mailto:support@dreampay.com"
            style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 10px 20px; 
            text-decoration: none; border-radius: 5px; font-size: 14px;"
          >
            Contact Support
          </a>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
          <p>© 2025 Dream Pay. All rights reserved.</p>
          <p>
            <a href="#" style="color: #4f46e5; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `;

              const subject = "Withdrawal Request";

              // Send emails with error handling
              try {
                     await Promise.all([
                            sendOTP({ email: user.email, subject, html: emailTemplate }),
                            sendOTP({ email: "dreampay.help@gmail.com", subject, html: emailTemplate }),
                     ]);
              } catch (emailError) {
                     console.error("Error sending email:", emailError);
                     // Log email failure but don't fail the withdrawal
              }

              res.status(200).json({
                     message: "Withdrawal request processed successfully",
                     balance: updatedUser.balance,
                     withdrawalId,
                     success: true,
              });
       } catch (error) {
              console.error("Error in withdrawMoney:", error);
              res.status(500).json({
                     message: "Server error",
                     error: error.message,
                     success: false,
              });
       }
};
export const levelIncome = async (req, res) => {
       try {
              const { level, userId } = req.body;

              const user = await User.findById(userId)

              user.level = level
              await user.save()

       } catch (error) {

       }
}