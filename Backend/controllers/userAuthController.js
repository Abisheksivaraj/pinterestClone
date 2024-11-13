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

  const token = generateToken(loginId._id, res);

  res.json({
    loginId,
    auth: true,
    token: token,
    message: "User logged in successfully",
  });
});

exports.myProfile = async (req, res) => {
  try {
    const profileName = await User.findById(req.user._id);
    res.json(profileName);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.userProfile = tryCatch(async (req, res) => {
  // Fetch user by ID from the URL parameter
  const userProfile = await User.findById(req.params.id).select("-password");

  // Check if the user exists
  if (!userProfile) {
    return res.status(404).json({ message: "User not found" });
  }

  // Respond with user data
  res.json(userProfile);
});

exports.followAndUnfollowUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);
  const loggedInUser = await User.findById(req.user._id);

  if (!user)
    return res.status(400).json({
      message: "No user with this id",
    });

  if (user._id.toString() === loggedInUser._id.toString())
    return res.status(400).json({
      message: "you can't follow yourself",
    });

  if (user.followers.includes(loggedInUser._id)) {
    const indexFollowing = loggedInUser.following.indexOf(user._id);
    const indexFollowers = user.followers.indexOf(loggedInUser._id);

    loggedInUser.following.splice(indexFollowing, 1);
    user.followers.splice(indexFollowers, 1);

    await loggedInUser.save();
    await user.save();

    res.json({
      message: "User Unfollowed",
    });
  } else {
    loggedInUser.following.push(user._id);
    user.followers.push(loggedInUser._id);

    await loggedInUser.save();
    await user.save();

    res.json({
      message: "User followed",
    });
  }
});

exports.logOut = tryCatch(async (req, res) => {
  res.cookie("token", "", { days: 0 });
  res.json({
    message: "logged Out Successfully",
  });
});
