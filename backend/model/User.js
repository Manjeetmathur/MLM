import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  referralCode: String,
  referredBy: String,
  balance: { type: Number, default: 0 },
  referrals: { type: Number, default: 0 }, // Tracks referral count
  referralBonus: { type: Number, default: 0 }, // Tracks referral earnings
  level: { type: Number, default: 1 }, // Default level is 1
  accountNo: { type: String, },
  accountHolderName: String,
  ifscCode: { type: String, },
  phoneNo: { type: String,default:"" },
  kycVerified: { type: Boolean, default: false },
  otp: { type: String, },
  otpExpires: { type: Date, },
  withdrawMoney: [
    {
      money: { type: Number, required: true },
      withdrawDate: { type: String, required: true },
    }
  ],
  paymentScreenshots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PaymentScreenShot'
    }
  ],

  plans: [
    {
      type: Schema.Types.ObjectId,
      ref: "Plan"
    }
  ],

});

const User = mongoose.model("User", UserSchema);
export default User;
