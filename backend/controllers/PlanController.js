import mongoose from "mongoose";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { sendOTP } from "../config/nodemailer.js";
import User from "../model/User.js";
import PaymentScreenShot from "../model/paymentScreenShot.js";
import Plan from "../model/plan.js";

const investmentPackages = [
       { id: "1", amount: 250, dailyIncome: 25 },
       { id: "2", amount: 500, dailyIncome: 50 },
       { id: "3", amount: 1000, dailyIncome: 100 },
       { id: "4", amount: 2500, dailyIncome: 250 },
       { id: "5", amount: 5000, dailyIncome: 500 },
];

// Add Investment Plan to User
export const uploadSst = async (req, res) => {
       try {
              const { userId, packageId } = req.body;

              if (!userId || !packageId) {
                     throw new Error("package is unavailable");
              }
              const user = await User.findById(userId);
              if (!user) {
                     throw new Error("User not found");
              }

              if (!req.file) {
                     throw new Error("Screenshot is not available uploaded");
              }


              // Upload image to Cloudinary

              const selectedPackage = investmentPackages.find((p) => p.id == packageId);
              if (!selectedPackage) {
                     return res.status(400).json({ msg: "Invalid package selected" });
              }
              const uploadResult = await uploadOnCloudinary(req.file.path);
              if (!uploadResult || !uploadResult.secure_url) {
                     throw new Error("Error uploading image");
              }

              // Update user with the new payment details
              const newSst = await PaymentScreenShot.create(
                     {
                            imageUrl: uploadResult.secure_url,
                            paymentDate: new Date(),
                            money: selectedPackage.amount,
                            owner: user._id
                     },
              );
              user.paymentScreenshots.push(newSst)
              await user.save();
              console.log(newSst)
              let text = "userId : " + userId + " email " + user.email + " " + "for packageId : " + packageId + " will be processed under 24 hours"
              let subject = "package plan purchased : "
              await sendOTP({ email: user.email, text, subject });
              text = text + ' Screenshots id : ' + newSst._id
              await sendOTP({ email: 'manjeetkumar62054@gmail.com', text, subject });

              res.json({
                     message: "Wait for few hours for verification ",
                     success: true
              })

       } catch (error) {
              res.json({ message: "Server Error", error: error.message });
       }
};

export const VerifySst = async (req, res) => {

       try {
              const { userId, packageId, sstId } = req.body;
              const user = await User.findById(userId);
              if(!userId || !packageId || !sstId) {
                     throw new Error("packageId required");
              }
              if (!user) {
                     return res.status(404).json({ msg: "User not found" });
              }
              const selectedPackage = investmentPackages.find((p) => p.id === packageId);
              if (!selectedPackage) {
                     return res.status(400).json({ msg: "Invalid package selected" });
              }
              // Update user with the new payment details
              const sst = await PaymentScreenShot.findById(sstId)
              sst.verifiedPlan = true;
              await sst.save()

              // Referral Bonus & Level Update Logic
              if (user.referredBy) {
                     const referrer = await User.findOne({ referralCode: user.referredBy });

                     if (referrer) {
                            // Referral bonus (10% of package amount)
                            let referralAmount = selectedPackage.amount * 0.10;
                            referrer.balance += referralAmount;
                            referrer.referralBonus += referralAmount;
                            referrer.referrals += 1;

                            // Check if the referrer qualifies for the next level
                            let nextLevelTarget = 5 * Math.pow(2, referrer.level - 1); // 5, 10, 20, 40...
                            if (referrer.referrals >= nextLevelTarget) {
                                   let levelBonus = referrer.referrals * 50; // 100% of referral earnings
                                   referrer.balance += levelBonus;
                                   referrer.referralBonus += levelBonus;
                                   referrer.level += 1;
                            }

                            await referrer.save();
                     }
              }



              const plan = await Plan.create({
                     packageAmount: selectedPackage.amount,
                     dailyIncome: selectedPackage.dailyIncome,
                     totalIncome: selectedPackage.dailyIncome * 24,
                     createdAt: new Date(),
                     owner: user._id,
                     sstId: sst._id
              })
              user.plans.push(plan)
              await user.save();

              // Send confirmation emails
              let text = `Thanks for choosing a package! \nUser ID: ${userId}\nPackage: ₹${selectedPackage.amount} \nDaily Income: ₹${selectedPackage.dailyIncome}`;
              let subject = "Package Confirmation";
              await sendOTP({ email: "manjeetkumar62054@gmail.com", text, subject });
              await sendOTP({ email: user.email, text, subject });

              res.status(201).json({
                     message: "Plan added successfully",
                     user,
                     success: true,
              });
       } catch (error) {
              res.json({
                     message: error.message
              })
       }
}

export const getPlanById = async (req, res) => {
       const planId = req.params.planId

       try {
              const plan = await Plan.findById(planId)
              if (!plan) {
                     throw new Error("Your Plan is not valid")
              }
              res.json({ plan, success: true })
       } catch (error) {

       }
}