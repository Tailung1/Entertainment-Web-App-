import User from "../schemas/usersSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checking = await User.findOne({ email });
    if (checking) {
      return res.json({ message: "User Already exists" });
    }
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ message: "Registred successfully" });
  } catch (err) {
    res.status(400).json({ message: "Unable to register" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid Password" });
      }
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json(token);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export { createUser, signIn };
