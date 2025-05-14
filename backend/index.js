import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";

dotenv.config({
       path:"/.env"
});
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173","https://mlm-mfmw.vercel.app"], credentials: true })); // Adjust frontend URL
app.use(cookieParser());

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
