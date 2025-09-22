import express, { Router } from "express";
import * as controller from "../../controllers/admin/song.controllers";
const router: Router = express.Router();
router.get("/", controller.index);
export const songRoutes: Router = router;
