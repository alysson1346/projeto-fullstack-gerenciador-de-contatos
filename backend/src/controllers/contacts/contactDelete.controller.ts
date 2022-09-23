import { Request, Response } from "express";
import contactDeleteService from "../../services/contacts/contactDelete.services";

const contactDeleteController = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;
    const { id } = req.params;

    const deleteContact = await contactDeleteService(email, id);

    return res.status(200).send(deleteContact);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default contactDeleteController;
