import express from "express";
import {
  createUser,
  signIn,
  generateOTP,
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/signin", signIn);
router.post("/generate-otp", generateOTP);

export default router;
