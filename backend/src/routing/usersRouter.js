import express from "express";
import {
  createUser,
  signIn,
  validateEmail
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/signin", signIn);
router.post("/validateEmail", validateEmail);

export default router;
