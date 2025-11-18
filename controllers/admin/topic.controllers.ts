import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";
// GET /topics
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
  });
  res.render("admin/pages/topics/index.pug", {
    pageTitle: "Trang quản lý chủ đề",
    topics: topics,
  });
};
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/topics/create.pug", {
    pageTitle: "Trang tạo chủ đề ",
  });
};
export const createPost = async (req: Request, res: Response) => {
  const body = req.body;
  const topic = await Topic.create(body);
  topic.save();
  res.redirect("/admin/topics");
};
export const deleteTopic = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Topic.updateOne({ _id: id }, { deleted: true });
    res.json({
      code: 200,
      message: "Xoá thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xoá thất bại",
    });
  }
};
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  const topic = await Topic.findOne({ _id: id });
  res.render("admin/pages/topics/detail.pug", {
    pageTitle: "Trang chi tiết Topic",
    topic: topic,
  });
};
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const topic = await Topic.findOne({ _id: id });
  res.render("admin/pages/topics/edit.pug", {
    pageTitle: "Trang chỉnh sửa chủ đề",
    topic: topic,
  });
};
export const editPatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const dataTopic = {
      title: req.body.title,
      avatar: req.body.avatar,
      description: req.body.description,
      status: req.body.status,
    };
    if (req.params.avatar) {
      dataTopic["avatar"] = req.body.avatar;
    }
    await Topic.updateOne({ _id: id }, dataTopic);
    res.redirect(`${systemConfig.prefixAdmin}/topics`);
  } catch (error) {
    alert("cập nhật không thành công");
    res.redirect(req.get("referer"));
  }
};
