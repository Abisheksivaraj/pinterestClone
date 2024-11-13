const imageSchema = require("../models/imageSchema");
const cloudinary = require("cloudinary").v2; // Cloudinary configuration
const tryCatch = require("../utils/TryCatchError");
const urlData = require("../utils/url"); // Utility to generate URL

exports.createImage = tryCatch(async (req, res) => {
  const { title, pin } = req.body; // Extract title and pin from request body
  const file = req.file; // Get the uploaded file from the request

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" }); // Check if file exists
  }

  const fileUrl = urlData(file); // Generate URL from the uploaded file

  // Upload the image to Cloudinary
  const uploadedImage = await cloudinary.uploader.upload(fileUrl.content);

  // Save the image data in the database
  await imageSchema.create({
    title,
    pin,
    image: {
      id: uploadedImage.public_id, // Cloudinary public ID
      url: uploadedImage.secure_url, // Cloudinary secure URL
    },
    owner: req.user._id, // Save the user ID who uploaded the image
  });

  // Respond with success message
  res.json({
    message: "Pin created successfully",
  });
});

exports.getAllImages = tryCatch(async (req, res) => {
  const image = await imageSchema.find().sort({ createdAt: -1 });
  res.json(image);
});

exports.getSingleImages = tryCatch(async (req, res) => {
  const image = await imageSchema
    .findById(req.params.id)
    .populate("owner", "-password");
  res.json(image);
});

exports.commentOnImage = tryCatch(async (req, res) => {
  const pin = await imageSchema.findById(req.params.id);

  if (!pin)
    return res.status(400).json({
      message: "No Pin with this id",
    });

  pin.comments.push({
    user: req.user._id,
    name: req.user.name,
    comment: req.body.comment,
  });

  await pin.save();

  res.json({
    message: "Comment Added",
  });
});

exports.deleteComment = tryCatch(async (req, res) => {
  const { id } = req.params;
  const { commentId } = req.query;

  // Find the pin (or image) by ID
  const pin = await imageSchema.findById(id);
  if (!pin) {
    return res.status(400).json({ message: "Pin not found" });
  }

  // Check if the comment ID was provided
  if (!commentId) {
    return res.status(400).json({ message: "Please provide a comment ID" });
  }

  // Find the index of the comment
  const commentIndex = pin.comments.findIndex(
    (comment) => comment._id.toString() === commentId
  );

  // If comment is not found, return an error
  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const comment = pin.comments[commentIndex];

  // Check if the current user is the owner of the comment
  if (comment.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You do not have permission to delete this comment" });
  }

  // Remove the comment from the array
  pin.comments.splice(commentIndex, 1);

  // Save the changes to the database
  await pin.save();

  return res.json({ message: "Comment deleted successfully" });
});

exports.deleteImage = tryCatch(async (req, res) => {
  const pin = await imageSchema.findById(req.params.id);

  if (!pin) {
    return res.status(400).json({ message: "Pin not found" });
  }

  // Check if the user is authorized to delete the image
  if (pin.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Delete the image from Cloudinary
  await cloudinary.uploader.destroy(pin.image.id);

  // Delete the pin from the database
  await pin.deleteOne();

  return res.json({ message: "Pin deleted successfully" });
});

exports.updateComment = tryCatch(async (req, res) => {
  const pin = await imageSchema.findById(req.params.id);

  if (!pin) {
    return res.status(400).json({ message: "Pin not found" });
  }

  if (pin.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  pin.title = req.body.title;
  pin.pin = req.body.pin;

  await pin.save();

  res.json({
    message: "pin Updated",
  });
});

exports.toggleLike = tryCatch(async (req, res) => {
  const userId = req.user._id; // Assuming user_id is available from the authenticated user
  const pinId = req.params.id; // Pin ID from the URL parameter

  // Find the pin by ID
  const pin = await imageSchema.findById(pinId);

  if (!pin) {
    return res.status(404).json({ message: "Pin not found" });
  }

  // Check if the user has already liked the pin
  const userHasLiked = pin.likes.includes(userId);

  if (userHasLiked) {
    // User has liked the pin, so we "unlike" it
    pin.likes = pin.likes.filter(
      (like) => like.toString() !== userId.toString()
    ); // Remove the user from likes array
    await pin.save();
    return res
      .status(200)
      .json({ message: "Pin unliked successfully", likes: pin.likes });
  } else {
    // User has not liked the pin, so we "like" it
    pin.likes.push(userId); // Add the user to likes array
    await pin.save();
    return res
      .status(200)
      .json({  message: "Pin liked successfully", likes: pin.likes });
  }
});


exports.getLikedImages = tryCatch(async (req, res) => {
  const userId = req.params.userId; // Get the user ID from the request parameters

  const likedImages = await imageSchema
    .find({ likes: userId }) // Find images where the likes array includes the user ID
    .populate("owner", "-password"); // Populate the owner field, excluding the password field

  res.json(likedImages); // Return the liked images
});





