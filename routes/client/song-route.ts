import express, { Router } from "express";
import * as controller from "../../controllers/client/song.controllers";
const router: Router = express.Router();
router.get("/:slug", controller.list);
router.get("/detail/:slugSong", controller.detail);
router.patch("/like/:typeLike/:idSong", controller.like);
export const songRoutes: Router = router;
