const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const registerUser = require("./routes/userAuth");
const images = require("../backend/routes/imageRoutes");
const cors = require("cors");

app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use("/api/user", registerUser);

app.use("/api/pin",images);

module.exports = app;
