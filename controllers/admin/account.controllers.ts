import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Account from "../../models/account.model";
export const index = async (req: Request, res: Response) => {
  const accounts = await Account.find({ deleted: false, status: "active" });
  res.render("admin/pages/account/index.pug", {
    pageTitle: "Quản lý tài khoản Admin",
    accounts: accounts,
  });
};
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/account/create.pug", {
    pageTitle: "Thêm tài khoản Admin",
  });
};
export const createPost = async (req: Request, res: Response) => {
  const dataAccount = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    avatar: req.body.avatar,
    status: req.body.status,
  };
  if (req.body.avatar) {
    dataAccount.avatar = req.body.avatar;
  }
  if (req.body.password) {
    const saltRounds = 10;
    const passwordHas = req.body.password;
    const hashedPassword = await bcrypt.hash(passwordHas, saltRounds);
    dataAccount.password = hashedPassword;
  }
  const newAccount = new Account(dataAccount);
  await newAccount.save();
  res.redirect("http://localhost:3000/admin/accounts");
};
