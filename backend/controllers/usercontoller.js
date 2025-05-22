
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTP } from "../config/nodemailer.js";


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
              console.log("ji")

              user = await User.create({ name, email, password: hashedPassword, referredBy, referralCode, balance, phoneNo  });
              console.log(user)
              // Congratulatory Email Content
              const welcomeEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(to right, #4f46e5, #7c3aed); padding: 20px; text-align: center;">
          <img src="https://via.placeholder.com/150x50?text=Your+Logo" alt="Logo" style="max-width: 150px;" />
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

              await sendOTP({ email, subject: "Welcome to Our Platform!", html: welcomeEmailContent });
              res.json({ success: true, msg: "User registered successfully" });
       } catch (error) {
              console.log(error)
              res.json({ msg: "Server Error" });
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
              if (user.email == 'kumanjeet779@gmail.com') {
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

export const withdraw = async (req, res) => {
       const { amount } = req.body;
       try {
              const user = await User.findById(req.user.userId);

              if (user.balance < amount) {
                     throw new Error("Insufficient Balance");
              }

              user.balance -= amount;
              await user.save();

              res.json({ success: true, msg: "Withdrawal successful", balance: user.balance });
       } catch (error) {
              res.json({ msg: "Server Error" });
       }
};
export const uploadPaymentScreenshot = async (req, res) => {
       try {
              const { userId } = req.params;

       } catch (error) {
              res.json({ message: "Server error", error });
       }
};
export const withdrawMoney = async (req, res) => {
       try {
              const { userId } = req.params;
              const { money } = req.body;

              if (!money) {
                     throw new Error("amount required");
              }


              const updatedUser = await User.findByIdAndUpdate(
                     userId,
                     {
                            $push: {
                                   withdrawMoney: {
                                          money: money,
                                          withdrawDate: new Date(),
                                   }
                            }
                     },
                     { new: true }
              );
              updatedUser.balance = updatedUser.balance - money
              await updatedUser.save()
              if (!updatedUser) {
                     throw new Error("User not found");
              }
              let text = "userID : " + userId + " email : " + updatedUser.email + " money : " + money + " will be processed under 24 hours"
              let subject = "Withdrawal money : "
              await sendOTP({ email: 'manjeetkumar62054@gmail.com', text, subject });
              await sendOTP({ email: updatedUser.email, text, subject });
              res.status(200).json({
                     message: "withdrawal done",
                     balance: updatedUser.balance, success: true
              });

       } catch (error) {
              res.json({ message: "Server error", error });
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