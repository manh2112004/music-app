import express, { Router } from "express";
import * as controller from "../../controllers/client/song.controllers";
const router: Router = express.Router();
router.get("/:slug", controller.list);
export const songRoutes: Router = router;
