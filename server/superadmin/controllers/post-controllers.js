const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

//Import Validation
const validateRegisterInput = require("../../validation/register");

//REGISTER ADMIN
registerAdmin = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  if (req.body.role !== "moderator" && req.body.role !== "admin") {
    return res.status(403).json({ error: "Not Autorised" });
  }

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

  const emailExists = await User.findOne({ email: req.body.email });
  errors.email = "Email already exists";
  if (emailExists) return res.status(400).json(errors);

  try {
    await newUser
      .save()
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  } catch (err) {
    res.status(400).json(err);
  }
};

//LOGIN ADMIN
loginAdmin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "no user found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched
        const payload = { id: user.id, name: user.name };
        //Sign Token
        const accesssToken = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 20 }
        );
        // const refreshToken = jwt.sign(
        //   payload,
        //   process.env.REFRESH_TOKEN_SECRET,
        //   { expiresIn: 3600 }
        // );
        res.json({ accesssToken });
      } else {
        return res.status(400).json({ errors: "password incorrect" });
      }
    });
  });
};

module.exports = { registerAdmin, loginAdmin };
