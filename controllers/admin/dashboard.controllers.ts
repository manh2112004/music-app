import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import Song from "../../models/song.model";
// GET /dashboard
export const dashboard = async (req: Request, res: Response) => {
  const topics = await Topic.find({ deleted: false, status: "active" });
  const singers = await Singer.find({ deleted: false, status: "active" });
  const songs = await Song.find({ deleted: false, status: "active" });
  res.render("admin/pages/dashboard.pug", {
    pageTitle: "Trang tổng quan",
    songs: songs,
    singers: singers,
    topics: topics,
  });
};
