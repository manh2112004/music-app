import express, { Router } from "express";
import * as controller from "../../controllers/admin/topic.controllers";
const router: Router = express.Router();
router.get("/", controller.index);
export const topicRoutes: Router = router;
