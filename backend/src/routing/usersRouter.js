import express from "express";
import {
  createUser,
  signIn,
} from "../controllers/usersController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/signin", signIn);

export default router;
