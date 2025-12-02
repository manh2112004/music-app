import { Request, Response } from "express";
import Playlist from "../../models/playlist.model";
export const index = async (req: Request, res: Response) => {
  const playlists = await Playlist.find({ user_id: res.locals.user?._id });
  res.render("client/pages/playlists/index.pug", {
    pageTitle: "Playlists",
    playlists,
  });
};
export const create = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = res.locals.user?._id;
  await Playlist.create({
    title,
    user_id: userId,
    tracks: [],
  });

  res.json({ success: true });
};
export const detail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const playlist = await Playlist.findOne({ _id: id });
  res.render("client/pages/playlists/detail.pug", {
    pageTitle: "Chi tiết playlist",
    playlist: playlist,
  });
};
