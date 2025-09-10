import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    id: () => uuidv4(),
  },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: String, required: true, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User
