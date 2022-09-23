import { Request, Response, NextFunction } from "express";
import { Contact } from "../entities/contact.entity";
import { AppDataSource } from "../data-source";

export const verifyContactID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const contactRepository = AppDataSource.getRepository(Contact);
    const contactExist = await contactRepository.findOneBy({ id: id });
    if (contactExist) {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    return res.status(401).json({ message: "Contact don't exist" });
  }
};
