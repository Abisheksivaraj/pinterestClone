const express = require("express");
const { createImage, getAllImages, getSingleImages, commentOnImage, deleteComment, deleteImage, updateComment } = require("../controllers/imageController");
const route = express.Router();
const auth = require("../middlewares/auth");
const uploadFile = require("../middlewares/multer");

route.post("/newImage", auth, uploadFile, createImage);

route.get("/allImage",auth,getAllImages)

route.get("/getSingleImage/:id",auth,getSingleImages)

route.put("/updateImage/:id", auth, updateComment);

route.delete("/deleteImage/:id",auth,deleteImage)

route.post("/comment/:id", auth, commentOnImage);

route.delete("/deleteComment/:id", auth, deleteComment)

module.exports = route;
