import { Request, Response } from "express";
import UserModel from "../../models/user.model";
import bcrypt from "bcrypt";
export const register = async (req: Request, res: Response) => {
  res.render("client/pages/users/register.pug", { pageTitle: "Đăng Ký" });
};
export const createUser = async (req: Request, res: Response) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return res.render("client/pages/users/register.pug", {
        errorMessage: "Mật khẩu xác nhận không khớp",
      });
    }
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    await UserModel.create(req.body);
    res.redirect("http://localhost:3000/users/login");
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.render("client/pages/users/register.pug", {
        errorMessage: "Email này đã được sử dụng!",
      });
    }
  }
};
export const login = async (req: Request, res: Response) => {
  res.render("client/pages/users/login.pug", { pageTitle: "Đăng Nhập" });
};
export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render("client/pages/users/login", {
      errorMessage: "Email và mật khẩu là bắt buộc",
    });
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.render("client/pages/users/login", {
      errorMessage: "Email hoặc mật khẩu không đúng",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.render("client/pages/users/login", {
      errorMessage: "Email hoặc mật khẩu không đúng",
    });
  }
  res.cookie("tokenUser", user.token, { httpOnly: true });
  res.redirect("/");
};
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
