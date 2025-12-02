import mongoose from "mongoose";
const playlistSchema = new mongoose.Schema(
  {
    id: String,
    user_id: String,
    title: String,
    image: String,
    tracks: [String],
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);
export default Playlist;
