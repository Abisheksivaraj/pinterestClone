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

route.post("/login",login)

route.get("/logout", auth,logOut);

route.get("/profile", auth, myProfile);

route.get("/:id", auth,userProfile);

route.post("/follow/:id", auth,followUser);

module.exports = route;
