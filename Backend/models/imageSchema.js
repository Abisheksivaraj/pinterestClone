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
        ref: "registration", 
      },
    ],
    tags: [
      {
        type: String, 
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("imageCreation", imageSchema, "imageCreation");
