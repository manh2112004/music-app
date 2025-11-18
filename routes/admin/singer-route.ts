import express, { Router } from "express";
import * as controller from "../../controllers/admin/singer.controllers";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
import multer from "multer";
const upload = multer();
const router: Router = express.Router();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/createPost",
  upload.single("avatar"),
  uploadSingle,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/editPost/:id",
  upload.single("avatar"),
  uploadSingle,
  controller.editPost
);
router.get("/delete/:id", controller.deleteSinger);
export const singerRoutes: Router = router;
