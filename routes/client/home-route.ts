import express, { Router } from "express";
import * as controller from "../../controllers/client/home.controllers";
const router: Router = express.Router();
router.get("/", controller.index);
export const homeRoutes: Router = router;
