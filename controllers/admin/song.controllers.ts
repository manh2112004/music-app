import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
// GET /songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  }).sort({ createdAt: "descending" });
  res.render("admin/pages/songs/index.pug", {
    pageTitle: "Trang quản lý bài hát",
    songs: songs,
  });
};
// GET /songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    status: "active",
    deleted: false,
  }).select("title");
  const singers = await Singer.find({
    status: "active",
    deleted: false,
  }).select("fullName");
  res.render("admin/pages/songs/create.pug", {
    pageTitle: "Trang tạo mới bài hát",
    topics: topics,
    singers: singers,
  });
};
// POST /songs/create
export const createPost = async (req: Request, res: Response) => {
  let avatar = "";
  let audio = "";
  if (req.body.avatar) {
    avatar = req.body.avatar[0];
  }
  if (req.body.audio) {
    audio = req.body.audio[0];
  }
  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio,
    lyrics: req.body.lyrics,
  };
  const song = new Song(dataSong);
  await song.save();
  res.redirect(`${systemConfig.prefixAdmin}/songs`);
};
// GET /songs/edit/:idSong
export const edit = async (req: Request, res: Response) => {
  const id = req.params.idSong;
  const song = await Song.findOne({
    _id: id,
    deleted: false,
  });

  const topics = await Topic.find({
    deleted: false,
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
  }).select("fullName");
  res.render("admin/pages/songs/edit.pug", {
    pageTitle: "Trang quản chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers,
  });
};
// [PATCH] /songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.idSong;
  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    lyrics: req.body.lyrics,
  };

  if (req.body.avatar) {
    dataSong["avatar"] = req.body.avatar[0];
  }

  if (req.body.audio) {
    dataSong["audio"] = req.body.audio[0];
  }

  await Song.updateOne(
    {
      _id: id,
    },
    dataSong
  );
  res.redirect(`${systemConfig.prefixAdmin}/songs/edit/${id}`);
};
