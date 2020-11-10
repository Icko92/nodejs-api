const bcrypt = require("bcryptjs");

const User = require("../../models/User");

//Create Admin
const registerAdmin = async (req, res) => {
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    role: req.body.role,
    password: hashedPassword,
  });
  try {
    await newUser
      .save()
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { registerAdmin };
