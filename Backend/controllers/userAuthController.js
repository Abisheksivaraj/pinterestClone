const bcrypt = require("bcrypt");
const User = require("../models/registerSchema");
const tryCatch = require("../utils/TryCatchError");
const { generateToken } = require("../utils/jwtToken.js");

exports.register = tryCatch(async (req, res) => {
  try {
    // Corrected destructuring syntax
    const { name, email, password } = req.body;

    // Check if the user already exists
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email has already been registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });

    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

exports.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const loginId = await User.findOne({ email });

  if (!loginId)
    return res.status(400).json({
      message: "There is no user under this email ID",
    });

  const passwordCompare = await bcrypt.compare(password, loginId.password);

  if (!passwordCompare)
    return res.status(400).json({
      message: "Wrong password",
    });

  generateToken(loginId._id, res);

  res.json({
    loginId,
    message: "User logged in successfully",
  });
});
