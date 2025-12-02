import express, { Router } from "express";
import * as controller from "../../controllers/client/use.controllers";
const router: Router = express.Router();
router.get("/register", controller.register);
router.post("/registerPost", controller.createUser);
router.get("/login", controller.login);
router.post("/loginPost", controller.loginPost);
router.get("/logout", controller.logout);
export const userRoutes: Router = router;
