import { Request, Response } from "express";

import contactCreatetService from "../../services/contacts/contactCreate.services";

const contactCreateController = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req;
    const { name, email, phone } = req.body;

    const newContact = await contactCreatetService({
      name,
      email,
      phone,
      userEmail,
    });

    return res.status(201).send(newContact);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default contactCreateController;
