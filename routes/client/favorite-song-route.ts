import express, { Router } from "express";
import * as controller from "../../controllers/client/favorite-song.controllers";
const router: Router = express.Router();
router.get("/", controller.index);
export const favoriteSongRoutes: Router = router;
