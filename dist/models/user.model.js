"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { generateRandomString } = require("../helpers/generate");
const userSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema, "users");
exports.default = User;
