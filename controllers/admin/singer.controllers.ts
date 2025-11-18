import { Request, Response } from "express";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";
export const index = async (req: Request, res: Response) => {
  const singers = await Singer.find({ deleted: false });
  res.render("admin/pages/singer/index.pug", {
    pageTitle: "Trang quản lý ca sĩ",
    singers: singers,
  });
};
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/singer/create.pug", {
    pageTitle: "Trang tạo mới ca sĩ",
  });
};
export const createPost = async (req: Request, res: Response) => {
  const dataSinger = {
    fullName: req.body.fullName,
    avatar: req.body.avatar,
    status: req.body.status,
  };
  if (req.body.avatar) {
    dataSinger["avatar"] = req.body.avatar;
  }
  const singer = await Singer.create(dataSinger);
  singer.save();
  res.redirect(`/admin/singers`);
};
export const edit = async (req: Request, res: Response) => {
  const singerId = req.params.id;
  const singer = await Singer.findOne({ _id: singerId, deleted: false });
  res.render("admin/pages/singer/edit.pug", {
    pageTitle: "Trang chỉnh sửa ca sĩ",
    singer: singer,
  });
};
export const editPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const singer = await Singer.findOne({ _id: id });
  const dataSinger = {
    fullName: singer.fullName,
    avatar: singer.avatar,
    status: singer.status,
  };
  if (req.body.avatar) {
    dataSinger["avatar"] = req.body.avatar;
  }
  await Singer.updateOne({ _id: id }, dataSinger);
  res.redirect(`/admin/singers`);
};
export const deleteSinger = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Singer.updateOne({ _id: id }, { deleted: true });
    res.json({
      code: 200,
      message: "Xoá sản phẩm thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xoá sản phẩm chưa thành công",
    });
  }
};
