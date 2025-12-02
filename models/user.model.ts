import mongoose from "mongoose";
const { generateRandomString } = require("../helpers/generate");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: generateRandomString(20),
    },
    avatar: {
      type: String,
      default: "",
    },
    favoriteSongs: {
      type: [String],
      default: [],
    },
    playlists: {
      type: [String],
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
