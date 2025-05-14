import mongoose, { Schema } from "mongoose";

const PlanSchema = new mongoose.Schema({
  packageAmount: { type: Number, required: true },
  dailyIncome: { type: Number, required: true },
  totalIncome: { type: Number, required: true },
  streak: { type: Number, default: 0 },  // Streak count
  lastTaskDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  sstId:{
     type: Schema.Types.ObjectId,
    ref: "PaymentScreenShot"
  },
  dailyDeposit : {type:Number,default:0}
});

const Plan = mongoose.model("Plan", PlanSchema);
export default Plan;
