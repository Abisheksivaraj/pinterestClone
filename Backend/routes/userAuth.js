const express = require("express");
const { register, login } = require("../controllers/userAuthController");
const route= express.Router();

// Change GET to POST for registration
route.post("/register", register);

route.post("/userLogin",login)

module.exports = route;
