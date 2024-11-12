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


exports.followUser = tryCatch(async (req, res) => {
  // Find the user to be followed by their ID in the URL parameter
  const userToFollow = await User.findById(req.params.id);

  // Find the logged-in user (follower) by their ID stored in `req.follower`
  const loggedInUser = await User.findById(req.follower._id);

  // Check if the user to follow exists
  if (!userToFollow) {
    return res.status(400).json({
      message: "User ID not found",
    });
  }

  // Prevent users from following themselves
  if (userToFollow._id.toString() === loggedInUser._id.toString()) {
    return res.status(400).json({
      message: "You can't follow yourself",
    });
  }

  // Check if the logged-in user is already following the target user
  const isFollowing = userToFollow.followers.includes(loggedInUser._id);

  if (isFollowing) {
    // If already following, unfollow the user by removing IDs from respective lists
    userToFollow.followers = userToFollow.followers.filter(
      (followerId) => followerId.toString() !== loggedInUser._id.toString()
    );
    loggedInUser.following = loggedInUser.following.filter(
      (followingId) => followingId.toString() !== userToFollow._id.toString()
    );

    // Save the changes
    await loggedInUser.save();
    await userToFollow.save();

    return res.json({
      message: "User unfollowed",
    });
  } else {
    // If not following, follow the user by adding IDs to respective lists
    userToFollow.followers.push(loggedInUser._id);
    loggedInUser.following.push(userToFollow._id);

    // Save the changes
    await loggedInUser.save();
    await userToFollow.save();

    return res.json({
      message: "User followed",
    });
  }
});



exports.logOut = tryCatch(async(req,res)=>{
  res.cookie("token","",{days:0});
  res.json({
    message:"logged Out Successfully"
  })
})


