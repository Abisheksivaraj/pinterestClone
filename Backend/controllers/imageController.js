const imageSchema = require("../models/imageSchema");
const cloudinary = require("cloudinary").v2;
const tryCatch = require("../utils/TryCatchError");
const urlData = require("../utils/url");

exports.createImage = tryCatch(async (req, res) => {
  const { title, pin } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileUrl = urlData(file);

  const uploadedImage = await cloudinary.uploader.upload(fileUrl.content);

  await imageSchema.create({
    title,
    pin,
    image: {
      id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    },
    owner: req.user._id,
  });

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

  const pin = await imageSchema.findById(id);
  if (!pin) {
    return res.status(400).json({ message: "Pin not found" });
  }

  if (!commentId) {
    return res.status(400).json({ message: "Please provide a comment ID" });
  }

  const commentIndex = pin.comments.findIndex(
    (comment) => comment._id.toString() === commentId
  );

  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const comment = pin.comments[commentIndex];

  if (comment.user.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You do not have permission to delete this comment" });
  }

  pin.comments.splice(commentIndex, 1);

  await pin.save();

  return res.json({ message: "Comment deleted successfully" });
});

exports.deleteImage = tryCatch(async (req, res) => {
  const pin = await imageSchema.findById(req.params.id);

  if (!pin) {
    return res.status(400).json({ message: "Pin not found" });
  }

  if (pin.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await cloudinary.uploader.destroy(pin.image.id);

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
  const userId = req.user._id;
  const pinId = req.params.id;

  const pin = await imageSchema.findById(pinId);

  if (!pin) {
    return res.status(404).json({ message: "Pin not found" });
  }

  const userHasLiked = pin.likes.includes(userId);

  if (userHasLiked) {
    pin.likes = pin.likes.filter(
      (like) => like.toString() !== userId.toString()
    );
    await pin.save();
    return res
      .status(200)
      .json({ message: "Pin unliked successfully", likes: pin.likes });
  } else {
    pin.likes.push(userId);
    await pin.save();
    return res
      .status(200)
      .json({ message: "Pin liked successfully", likes: pin.likes });
  }
});

exports.getLikedImages = tryCatch(async (req, res) => {
  const userId = req.params.userId;

  const likedImages = await imageSchema
    .find({ likes: userId })
    .populate("owner", "-password");

  res.json(likedImages);
});

exports.toggleTag = tryCatch(async (req, res) => {
  const userId = req.user._id;
  const pinId = req.params.id;
  const tag = req.body.tag;

  if (!tag) {
    return res.status(400).json({ message: "Tag is required" });
  }

  const pin = await imageSchema.findById(pinId);

  if (!pin) {
    return res.status(404).json({ message: "Pin not found" });
  }

  const tagIndex = pin.tags.indexOf(tag);

  if (tagIndex !== -1) {
    pin.tags.splice(tagIndex, 1);
    await pin.save();
    return res
      .status(200)
      .json({ message: "Tag removed successfully", tags: pin.tags });
  } else {
    pin.tags.push(tag);
    await pin.save();
    return res
      .status(200)
      .json({ message: "Tag added successfully", tags: pin.tags });
  }
});
