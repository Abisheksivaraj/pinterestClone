const jwt = require("jsonwebtoken");

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d", // Token expires in 3 days
  });

  // Set the token in a cookie
  res.cookie("token", token, {
    days: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
    httpOnly: true, // Cookie is accessible only by the server
    sameSite: "strict", // Prevent cross-site request forgery
  });
};

module.exports = { generateToken };
