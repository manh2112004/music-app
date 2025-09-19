import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";
//[GET] /search/type
export const result = async (req: Request, res: Response) => {
  const type = req.params.type;
  const keyword: string = `${req.query.keyword}`;
  let newSongs = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    // tạo slug ko dấu có dấu - ngăn cách
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");
    const songs = await Song.find({
      $or: [{ title: keywordRegex }, { slug: stringSlugRegex }],
    }).lean();
    for (const item of songs as any) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId,
      });
      item["infoSinger"] = infoSinger;
      newSongs.push({
        id: item._id,
        title: item.title,
        avatar: item.avatar,
        like: item.like,
        slug: item.slug,
        infoSinger: {
          fullName: infoSinger.fullName,
        },
      });
    }
    // newSongs = songs;
  }
  switch (type) {
    case "result":
      res.render("client/pages/search/result.pug", {
        pageTitle: `Kết quả:${keyword}`,
        keyword: keyword,
        songs: newSongs,
      });
      break;
    case "suggest":
      res.json({
        code: 200,
        message: "thành công",
        songs: newSongs,
      });
      break;
    default:
      break;
  }
};
