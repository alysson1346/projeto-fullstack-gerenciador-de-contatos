import { Request, Response } from "express";
import deleteUserServices from "../../services/users/userDelete.services";

const deleteUserController = async (req: Request, res: Response) => {
  const email = req.userEmail;

  try {
    const deleteUser = await deleteUserServices(email);
    return res.status(204).send({ message: "user deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .send({ error: error.name, message: error.message });
    }
  }
};

export default deleteUserController;
