import express, { Router } from "express";
import * as controller from "../../controllers/client/search.controllers";
const router: Router = express.Router();
router.get("/:type", controller.result);
export const searchRoutes: Router = router;
