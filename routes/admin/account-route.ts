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
router.get("/profile", controller.profile);
router.patch("/delete/:id", controller.deleteAccount);
router.get("/edit/:id", controller.edit);
router.post(
  "/editPost/:id",
  upload.single("avatar"),
  uploadSingle,
  controller.editPost
);
export const accountRoutes: Router = router;
