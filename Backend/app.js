const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const registerUser = require('./routes/userAuth')
const images = require("../backend/routes/imageRoutes")


app.use(cookieParser());


app.use(express.json());

app.use(registerUser);

app.use(images);


module.exports = app;
