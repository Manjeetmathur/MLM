import mongoose from "mongoose";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { sendOTP } from "../config/nodemailer.js";
import User from "../model/User.js";
import PaymentScreenShot from "../model/paymentScreenShot.js";
import Plan from "../model/plan.js";
import { error } from "console";

const investmentPackages = [
  { id: 1, amount: 500, dailyIncome: 50 },
  { id: 2, amount: 1000, dailyIncome: 100 },
  { id: 3, amount: 2500, dailyIncome: 250, },
  { id: 4, amount: 5000, dailyIncome: 500 },
  { id: 5, amount: 8000, dailyIncome: 800 },
  { id: 6, amount: 10000, dailyIncome: 1000 },
  { id: 7, amount: 25000, dailyIncome: 2500 },
  { id: 8, amount: 50000, dailyIncome: 5000 },
];

// Add Investment Plan to User
export const uploadSst = async (req, res) => {
  try {
    const { userId, packageId } = req.body;
    if (!userId || !packageId) {
      throw new Error("Package is unavailable");
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
    const newSst = await PaymentScreenShot.create({
      imageUrl: uploadResult.secure_url,
      paymentDate: new Date(),
      money: selectedPackage.amount,
      owner: user._id,
    });
    user.paymentScreenshots.push(newSst);
    await user.save();

    // Email content for user
    const userEmailContent = `
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
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">Package Purchase Received</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Hello ${user.name || 'Valued Customer'},<br/><br/>
            Thank you for purchasing a package with us! We have received your payment screenshot, and your request is being processed.
          </p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>User ID:</strong> ${userId}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Package Amount:</strong> ₹${selectedPackage.amount.toLocaleString()}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Daily Income:</strong> ₹${selectedPackage.dailyIncome.toLocaleString()}</p>
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Your package will be processed within 24 hours. You'll receive a confirmation email once it's approved.
          </p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Need help? Contact us at <a href="mailto:support@example.com" style="color: #4f46e5; text-decoration: none;">support@example.com</a></p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;

    // Email content for admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(to right, #4f46e5, #7c3aed); padding: 20px; text-align: center;">
          <img src="https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize/2020/06/20/10/Logo-268585_6769_100958523_1820718074.jpg" alt="Logo" style="max-width: 150px;" />
        </div>
        <!-- Body -->
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px;">New Package Purchase</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            A new package purchase request has been submitted and requires verification.
          </p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>User ID:</strong> ${userId}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Package ID:</strong> ${packageId}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Screenshot ID:</strong> ${newSst._id}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Amount:</strong> ₹${selectedPackage.amount.toLocaleString()}</p>
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Please verify the payment screenshot and approve the package within 24 hours.
          </p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Admin Notification</p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendOTP({ email: user.email, subject: "Package Plan Purchased", html: userEmailContent });
    await sendOTP({ email: 'dreampay.help@gmail.com', subject: "Package Plan Purchased", html: adminEmailContent });

    res.json({
      message: "Wait for few hours for verification",
      success: true,
    });
  } catch (error) {
    res.json({ message: "Server Error", error: error.message });
  }
};

export const VerifySst = async (req, res) => {
  try {
    const { userId, packageId, sstId } = req.body;
    console.log(userId)
    const user = await User.findById(userId);
    if (!userId || !packageId || !sstId) {
      throw new Error("packageId required");
    }
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const selectedPackage = investmentPackages.find((p) => p.id == packageId);
    if (!selectedPackage) {
      throw new Error("Invalid package selected" );
    }

    // Update payment screenshot
    const sst = await PaymentScreenShot.findById(sstId);
    sst.verifiedPlan = true;
    await sst.save();
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
      sstId: sst._id,
    });
    user.plans.push(plan);
    await user.save();
    // Email content for user and admin
    const confirmationEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(to right, #4f46e5, #7c3aed); padding: 20px; text-align: center;">
          <img src="https://via.placeholder.com/150x50?text=Your+Logo" alt="Logo" style="max-width: 150px;" />
        </div>
        <!-- Body -->
        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 20px; text-align: center;">
            Package Confirmation 🎉
          </h2>
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://via.placeholder.com/80x80?text=✓" alt="Checkmark" style="width: 80px; height: 80px;" />
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            Hello ${user.name || 'Valued Customer'},<br/><br/>
            We're excited to confirm that your package has been successfully activated!
          </p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>User ID:</strong> ${userId}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Package Amount:</strong> ₹${selectedPackage.amount.toLocaleString()}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Daily Income:</strong> ₹${selectedPackage.dailyIncome.toLocaleString()}</p>
            <p style="color: #1f2937; font-size: 16px; margin: 5px 0;"><strong>Total Income (24 Days):</strong> ₹${(selectedPackage.dailyIncome * 24).toLocaleString()}</p>
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.5;">
            You can now start earning your daily income. Check your dashboard for more details.
          </p>
        </div>
        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Need help? Contact us at <a href="mailto:support@example.com" style="color: #4f46e5; text-decoration: none;">support@example.com</a></p>
          <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendOTP({ email: "dreampay.help@gmail.com", text: confirmationEmailContent, subject: "Package Confirmation", html: confirmationEmailContent });
    await sendOTP({ email: user.email, text: confirmationEmailContent, subject: "Package Confirmation", html: confirmationEmailContent });

    res.status(201).json({
      message: "Plan added successfully",
      user,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const getPlanById = async (req, res) => {
  const planId = req.params.planId;

  try {
    const plan = await Plan.findById(planId);
    if (!plan) {
      throw new Error("Your Plan is not valid");
    }
    res.json({ plan, success: true });
  } catch (error) {
    res.json({ message: error.message });
  }
};