import mongoose from "mongoose";
const { generateRandomString } = require("../helpers/generate");
const singerSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generateRandomString(16),
    },
    phone: String,
    avatar: String,
    status: String,
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
const Account = mongoose.model("Account", singerSchema, "accounts");
export default Account;
