import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index-route";
import adminRoutes from "./routes/admin/index-route";
import { systemConfig } from "./config/config";
import path from "path";
import methodOverride from "method-override";

dotenv.config();
database.connect();

const app: Express = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// static + view
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// tinymce
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.locals.prefixAdmin = systemConfig.prefixAdmin;

// client routes
clientRoutes(app);

// admin routes
adminRoutes(app);

// ❌ Không dùng app.listen()
// ✅ Export app cho Vercel
export default app;
