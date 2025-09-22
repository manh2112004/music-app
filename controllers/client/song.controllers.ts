import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";
// [GET] /slug
export const list = async (req: Request, res: Response) => {
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
  res.render("client/pages/songs/list.pug", {
    pageTitle: "Danh sách bài hát",
    songs: songs,
  });
};
// [GET] /songs/detail/:idSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: String = req.params.slugSong;
  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false,
  });
  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false,
  }).select("fullName");
  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false,
  }).select("title");
  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id,
  });
  song["isFavoriteSong"] = favoriteSong ? true : false;
  res.render("client/pages/songs/detail", {
    pageTitle: "chi tiết bài hát",
    song: song,
    topic: topic,
    singer: singer,
  });
};
// [PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: String = req.params.idSong;
  const typeLike: String = req.params.typeLike;
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });
  const newLike: number = typeLike == "like" ? song.like + 1 : song.like - 1;
  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      like: newLike,
    }
  );
  res.json({
    code: 200,
    message: "thành công",
    like: newLike,
  });
};
// [PATCH] /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong: String = req.params.idSong;
  const typeFavorite: String = req.params.typeFavorite;
  switch (typeFavorite) {
    case "favorite":
      const exitsFavoriteSong = await FavoriteSong.findOne({
        songId: idSong,
      });
      if (!exitsFavoriteSong) {
        const record = new FavoriteSong({
          // userId: "",
          songId: idSong,
        });
        await record.save();
      } else {
      }
      break;
    case "unfavorite":
      await FavoriteSong.deleteOne({
        songId: idSong,
      });
      break;
    default:
      break;
  }
  res.json({
    code: 200,
    message: "Thành công",
  });
};
export const listen = async (req: Request, res: Response) => {
  const idSong: String = req.params.idSong;
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });
  const listen: number = song.listen + 1;
  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      listen: listen,
    }
  );
  const songNew = await Song.findOne({
    _id: idSong,
  });
  res.json({
    code: 200,
    message: "thành công",
    listen: songNew.listen,
  });
};
