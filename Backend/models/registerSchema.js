const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registration",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registration",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "registration",
  registrationSchema,
  "registration"
);
