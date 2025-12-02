import { Request, Response } from "express";
import Topic from "../../models/topic.model";
// [GET] /topics/
export const topics = async (req: Request, res: Response) => {
  const topics = await Topic.find({ deleted: false });
  await Promise.all(
    topics.map(async (topic) => {
      const upperName = topic.title.toUpperCase();
      // Chỉ update khi khác để tránh ghi DB nhiều lần
      if (topic.title !== upperName) {
        topic.title = upperName;
        await topic.save();
      }
    })
  );
  // Lấy lại danh sách sau khi update
  const updatedTopics = await Topic.find({ deleted: false });
  res.render("client/pages/topics/index", {
    pageTitle: "Chủ đề bài hát",
    topics: updatedTopics,
  });
};
