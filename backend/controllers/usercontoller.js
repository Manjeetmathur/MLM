
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
              const referralCode = "DP" + Math.random().toString(36).substr(2, 6)
              let balance = 0;
              if (referredBy) {
                     balance = 100
              }
              else {
                     balance = 50
              }


              user = new User({ name, email, password: hashedPassword, referredBy, referralCode, balance, phoneNo });
              await user.save();

              res.json({ success: true, msg: "User registered successfully" });
       } catch (error) {
              res.json({ msg: "Server Error" });
       }
};

export const login = async (req, res) => {
       const { email, password } = req.body;
       try {
              const user = await User.findOne({ email });
              if (!user) throw new Error("Invalid Credentials");
              const isMatch = bcrypt.compare(password, user.password);
              if (!isMatch) throw new Error("Invalid Credentials");
              const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
              res.cookie("token", token, {
                     httpOnly: true,
                     sameSite: "strict",
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
                     balance:updatedUser.balance, success: true
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