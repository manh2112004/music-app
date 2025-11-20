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
  } else {
    dataAccount.avatar =
      "https://th.bing.com/th/id/OIP.DX4W2nTD1ritISen1crI2gHaHa?w=120&h=108&c=7&bgcl=3d0c7a&r=0&o=6&dpr=1.3&pid=13.1";
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
export const profile = async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  const account = await Account.findOne({ token: token });
  res.render("admin/pages/account/profile.pug", {
    pageTitle: "Thông tin cá nhân",
    account: account,
  });
};
export const deleteAccount = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  await Account.findOne({ _id: accountId }).updateOne({ deleted: true });
  res.json({ success: true, message: "Xóa tài khoản thành công" });
};
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const account = await Account.findById(id);
  res.render("admin/pages/account/edit.pug", {
    pageTitle: "Chỉnh sửa tài khoản Admin",
    account: account,
  });
};
export const editPost = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  const dataAccount = {
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    avatar: req.body.avatar,
    status: req.body.status,
    password: req.body.password,
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
  await Account.findOne({ _id: accountId }).updateOne(dataAccount);
  res.redirect("http://localhost:3000/admin/accounts");
};
