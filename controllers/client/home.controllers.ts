import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({ deleted: false, status: "active" });
  const songs = await Song.find({ deleted: false, status: "active" });
  const singers = await Singer.find({ deleted: false, status: "active" });
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    topics: topics,
    songs: songs,
    singers: singers,
  });
};
