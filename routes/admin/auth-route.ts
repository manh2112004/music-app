import express, { Router } from "express";
import * as controller from "../../controllers/admin/auth.controllers";
const router: Router = express.Router();
router.get("/login", controller.index);
router.post("/loginPost", controller.login);
router.get("/logout", controller.logout);
export const authRoutes: Router = router;
