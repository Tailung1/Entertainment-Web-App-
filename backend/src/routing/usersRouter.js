import express from "express";
import {
  createUser,
  signIn,
  generateOTP,
  checkOTP,
  changePassword
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/signin", signIn);
router.post("/generate-otp", generateOTP);
router.post("/check-OTP", checkOTP);
router.post("/change-password", changePassword);

export default router;
