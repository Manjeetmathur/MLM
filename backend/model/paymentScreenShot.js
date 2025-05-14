import mongoose, { Schema } from "mongoose";

const PaymentScreenShotSchema = new mongoose.Schema({
       imageUrl: { type: String, required: true },
       paymentDate: { type: String, required: true },
       money: { type: Number, required: true },
       verifiedPlan: { type: Boolean, default: false },
       owner: {
              type: Schema.Types.ObjectId,
              ref: "User"
       }
});

const PaymentScreenShot = mongoose.model("PaymentScreenShot", PaymentScreenShotSchema);
export default PaymentScreenShot;

