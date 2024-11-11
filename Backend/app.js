const express = require("express");
const app = express();
const registerUser = require('./routes/userAuth')






app.use(express.json());

app.use(registerUser);


module.exports = app;
