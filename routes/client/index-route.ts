import { Express } from "express";
import { topicRoutes } from "./topic-route";
import { songRoutes } from "./song-route";
import { favoriteSongRoutes } from "./favorite-song-route";
import { searchRoutes } from "./search-route";
import { homeRoutes } from "./home-route";
import { userRoutes } from "./user-route";
import { playlistRoutes } from "./playlist-route";
// import { authClient } from "../../middlewares/client/auth.middlewares";
const clientRoutes = (app: Express): void => {
  app.use(`/`, homeRoutes);
  app.use(`/topics`, topicRoutes);
  app.use(`/songs`, songRoutes);
  app.use(`/favorite-songs`, favoriteSongRoutes);
  app.use(`/search`, searchRoutes);
  app.use(`/users`, userRoutes);
  app.use(`/playlists`, playlistRoutes);
};
export default clientRoutes;
