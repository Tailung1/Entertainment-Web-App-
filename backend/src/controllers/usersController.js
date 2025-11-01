import User from "../schemas/usersSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment";
import emailService from "../../../utils/emailService.js";
dotenv.config();

const generateOTP = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: "Invalid Email" });
  }
  async function generate() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = moment().add(10, "minutes").toISOString();
    const response = await User.updateOne(
      { email },
      { $set: { otp, otpExpiry } }
    );
    if (response.acknowledged) {
      await emailService(email, otp);
      return res.status(200).send({ message: "sent" });
    }
  }
  generate();
};

const checkOTP = async (req, res) => {
  const { otpEmailInput, otpString } = req.body;
  const user = await User.findOne({ email: otpEmailInput });
  if (user.otp === otpString) {
    res.status(200).json({ message: "OPT mached" });
  } else {
    res
      .status(400)
      .send({ message: "You entered incorrect Otp code" });
  }
};

const changePassword = async (req, res) => {
  const { newPassword, otpEmailInput } = req.body;
  try {
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
      { email: otpEmailInput },
      { password: newHashedPassword }
    );

    res
      .status(200)
      .json({ message: "Password changes successfully" });
  } catch (e) {
    res.status(400).json({ message: "Failed to change password", e });
  }
};

const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checking = await User.findOne({ email });
    if (checking) {
      return res.status(409).json({
        message: "User already exists with provided email ",
      });
    }
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    return res
      .status(201)
      .json({ message: "Registred successfully" });
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
    res.status(201).send({ message: "Logined sucessfully", token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export { createUser, signIn, generateOTP, checkOTP, changePassword };
