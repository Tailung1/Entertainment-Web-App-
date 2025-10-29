import express from "express";
import {
  createUser,
  signIn,
  generateOTP,
  checkOTP,
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/signin", signIn);
router.post("/generate-otp", generateOTP);
router.post("/check-OTP", checkOTP);

export default router;
