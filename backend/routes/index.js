import express from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import { deposit, getProfile, getReferrals, getUserbyId, levelIncome, login, logout, register,  withdrawMoney } from "../controllers/usercontoller.js";
import { requestOTP, verifyOTP } from "../controllers/kycController.js";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/adminController.js";
import { upload } from "../middlewares/multermiddleware.js";
import {  getPlanById, uploadSst, VerifySst } from "../controllers/PlanController.js";
import { completeTask } from "../controllers/taskController.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/kyc/request-otp", authMiddleware, requestOTP);
router.post("/kyc/verify-otp", authMiddleware, verifyOTP);
router.get("/referrals", authMiddleware, getReferrals);
router.get("/profile", authMiddleware, getProfile);
router.post("/deposit", authMiddleware, deposit);
// router.post("/withdraw", authMiddleware, withdraw);


router.get("/users", authMiddleware, getAllUsers); // View all users
router.get("/user/:userId", getUserById); // Get a single user
router.put("/user", authMiddleware, updateUser); // Modify a user
router.delete("/user/:userId", authMiddleware, deleteUser); // Delete a user

router.post("/withdraw-money/:userId", authMiddleware,withdrawMoney);
router.post("/upload-sst", authMiddleware, upload.single("image"), uploadSst);
router.post("/verify-sst",   VerifySst);
router.get("/plan/:planId",   getPlanById);
router.post("/level-income", authMiddleware, levelIncome);
router.post("/streak", authMiddleware, completeTask);


export default router;
