import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Account from "../../models/account.model";
export const index = async (req: Request, res: Response) => {
  res.render("admin/pages/auth/login.pug", {
    pageTitle: "Trang đăng nhập",
  });
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ email: email, deleted: false });
  if (!account) {
    return res.render("admin/pages/auth/login.pug", {
      pageTitle: "Trang đăng nhập",
      errorMessage: "Email khoản không tồn tại",
    });
  }
  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    return res.render("admin/pages/auth/login.pug", {
      pageTitle: "Trang đăng nhập",
      errorMessage: "Mật khẩu không đúng",
    });
  }
  if (account.status !== "active") {
    return res.render("admin/pages/auth/login.pug", {
      pageTitle: "Trang đăng nhập",
      errorMessage: "Tài khoản không hoạt động",
    });
  }
  res.cookie("token", account.token);
  res.redirect("http://localhost:3000/admin/dashboard");
};
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("http://localhost:3000/admin/auth/login");
};
