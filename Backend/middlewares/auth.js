const jwt = require("jsonwebtoken");
const User = require("../models/registerSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // If no token is provided, return an error
    if (!token) {
      return res.status(403).json({
        message: "Login required",
      });
    }

    // Verify the token using JWT
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is invalid or expired
    if (!decodedData) {
      return res.status(403).json({
        message: "Token expired or invalid",
      });
    }

    // Attach the user to the request object
    req.user = await User.findById(decodedData.id);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = auth; // Export the middleware
