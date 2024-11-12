const express = require("express");
const {
  register,
  login,
  myProfile,
  userProfile,
  followUser,
  logOut,
} = require("../controllers/userAuthController");
const auth = require('../middlewares/auth')
const route= express.Router();

// Change GET to POST for registration
route.post("/register", register);

route.post("/userLogin",login)

route.get("/userLogout", auth,logOut);

route.get("/profile", auth, myProfile);

route.get("/user/:id", auth,userProfile);

route.post("/follow/:id", auth,followUser);

module.exports = route;
