import express, { Router } from "express";
import * as controller from "../../controllers/admin/dashboard.controllers";
const router: Router = express.Router();
router.get("/", controller.dashboard);
export const dashboardRoutes: Router = router;
