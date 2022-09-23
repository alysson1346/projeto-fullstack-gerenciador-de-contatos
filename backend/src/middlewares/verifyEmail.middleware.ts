import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const verifyEmailExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const emailExists = await userRepository.findOneBy({ email: email });

  if (emailExists) {
    return res.status(400).send({ message: "email already exist" });
  }
  next();
};
