import { Request, Response } from "express";
import contactListOneService from "../../services/contacts/contactListOne.services";

const contactListOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const email = req.userEmail;
    const contact = await contactListOneService(email, id);

    return res.status(200).send(contact);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default contactListOneController;
