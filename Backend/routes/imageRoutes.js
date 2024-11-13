const express = require("express");
const { createImage, getAllImages, getSingleImages, commentOnImage, deleteComment, deleteImage, updateComment,toggleLike, getLikedImages} = require("../controllers/imageController");
const route = express.Router();
const auth = require("../middlewares/auth");
const uploadFile = require("../middlewares/multer");

route.post("/new", auth, uploadFile, createImage);

route.get("/all",auth,getAllImages)

route.get("/:id", auth, getSingleImages);

route.put(":id", auth, updateComment);

route.delete(":id",auth,deleteImage)

route.post("/comment/:id", auth, commentOnImage);

route.delete("/:id", auth, deleteComment)

route.post("/likeAndUnlike/:id", auth, toggleLike);

route.get("/getLikedPins/:userId", auth, getLikedImages);



module.exports = route;
