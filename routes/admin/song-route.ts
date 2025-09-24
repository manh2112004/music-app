import express, { Router } from "express";
import multer from "multer";
import * as controller from "../../controllers/admin/song.controllers";
import {
  uploadFields,
  uploadSingle,
} from "../../middlewares/admin/uploadCloud.middleware";
const router: Router = express.Router();
const upload = multer();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadFields,
  controller.createPost
);
export const songRoutes: Router = router;
