import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
// [GET] /slug
export const list = async (req: Request, res: Response) => {
  console.log(req.params.slug);
  const topic = await Topic.findOne({
    slug: req.params.slug,
    status: "active",
    deleted: false,
  });
  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  })
    .select("avatar title slug singerId like")
    .lean();
  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false,
    });
    song["infoSinger"] = infoSinger;
  }
  console.log(songs);
  res.render("client/pages/songs/list.pug", {
    pageTitle: "Danh sách bài hát",
    songs: songs,
  });
};
