import express, { Router } from "express";
import * as controller from "../../controllers/client/topic.controllers";
const router: Router = express.Router();
router.get("/", controller.topics);
export const topicRoutes: Router = router;