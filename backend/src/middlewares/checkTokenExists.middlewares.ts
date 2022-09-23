import { Request, Response, NextFunction } from "express";

export const checkExistToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (token === undefined) {
      throw new Error();
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication required" });
  }
};
