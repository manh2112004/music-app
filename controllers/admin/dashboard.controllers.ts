import { Request, Response } from "express";
// GET /dashboard
export const dashboard = (req: Request, res: Response): void => {
  res.render("admin/pages/dashboard.pug", {
    pageTitle: "Trang tổng quan",
  });
};
