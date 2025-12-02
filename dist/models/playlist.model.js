"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const playlistSchema = new mongoose_1.default.Schema({
    id: String,
    user_id: String,
    title: String,
    image: String,
    tracks: [String],
    deletedAt: Date,
}, {
    timestamps: true,
});
const Playlist = mongoose_1.default.model("Playlist", playlistSchema);
exports.default = Playlist;
