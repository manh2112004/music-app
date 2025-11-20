import express, { Router } from "express";
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
import * as controller from "../../controllers/admin/account.controllers";
const router: Router = express.Router();
const upload = multer();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/createPost",
  upload.single("avatar"),
  uploadSingle,
  controller.createPost
);
export const accountRoutes: Router = router;
