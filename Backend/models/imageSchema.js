const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registration", // Assuming this is the user model
      required: true,
    },
    image: {
      id: String,
      url: String,
    },
    comments: [
      {
        user: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registration", // Referencing the user who liked the image
      },
    ],
    tags: [
      {
        type: String, // Tags can be simple strings
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("imageCreation", imageSchema, "imageCreation");
