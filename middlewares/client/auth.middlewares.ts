// import { Request, Response, NextFunction } from "express";
// import UserModel from "../../models/user.model";
// export const authClient = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.cookies.tokenUser) {
//     next();
//   } else {
//     const user = await UserModel.findOne({ token: req.cookies.tokenUser });
//     if (!user) {
//       return res.redirect("/users/login");
//     } else {
//       res.locals.user = user;
//       next();
//     }
//   }
// };
