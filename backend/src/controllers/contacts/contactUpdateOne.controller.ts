import { Request, Response } from "express";
import contactUpdateOneService from "../../services/contacts/contactUpdate.services";

const contactUpdateOneController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;
    const { id } = req.params;
    const obj = req.body;

    const update = await contactUpdateOneService(email, id, obj);

    return res.status(200).send(update);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default contactUpdateOneController;
