import User from "../schemas/usersSchema";

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.create({
      email,
      password,
    });
    res.json({ message: "Registred successfully" });
  } catch (err) {
    res.json({ message: "Unable to register" });
  }
};
