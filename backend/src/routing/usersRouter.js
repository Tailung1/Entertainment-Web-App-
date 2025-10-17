// import express from "express";
// import {
//   createUser,
//   signIn,
// } from "../controllers/usersController.js";

// const router = express.Router();

// router.post("/register", createUser);
// router.post("/signin", signIn);

// export default router;

import {
  createUser,
  signIn,
} from "../../controllers/usersController";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Check the path to distinguish between register and signin
    if (req.url === "/api/users/signin") {
      try {
        await createUser(req, res); // Handle user registration
      } catch (error) {
        res
          .status(500)
          .json({ message: "Failed to create user", error });
      }
    } else if (req.url === "/api/signin") {
      try {
        await signIn(req, res); // Handle user sign-in
      } catch (error) {
        res.status(500).json({ message: "Sign-in failed", error });
      }
    } else {
      res.status(404).json({ message: "Route not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

