import { Request, Response, NextFunction } from "express";
import { systemConfig } from "../../config/config";
import Account from "../../models/account.model";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const account = await Account.findOne({
      token: req.cookies.token,
      deleted: false,
    }).select("-password");
    if (!account) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.locals.account = account;
      next();
    }
  }
};
