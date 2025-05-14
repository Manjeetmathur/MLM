import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({
       path:"./.env"
})
const connectDB = async () => {
       console.log(process.env.MONGO_URI)
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
