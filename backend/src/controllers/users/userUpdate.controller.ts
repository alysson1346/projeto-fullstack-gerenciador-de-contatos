import { Request, Response } from "express";
import updateUserServices from "../../services/users/userUpdate.services";

const updateUserController = async (req: Request, res: Response) => {
  const email = req.userEmail;
  const obj = req.body;

  try {
    const update = await updateUserServices(email, obj);

    return res.status(201).json(update);
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .send({ error: error.name, message: error.message });
    }
  }
};

export default updateUserController;
