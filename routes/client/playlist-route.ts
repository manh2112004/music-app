import express, { Router } from "express";
import * as controller from "../../controllers/client/playlist.controllers";
const router: Router = express.Router();
router.get("/", controller.index);
router.get("/:id", controller.detail);
router.post("/create", controller.create);
export const playlistRoutes: Router = router;
