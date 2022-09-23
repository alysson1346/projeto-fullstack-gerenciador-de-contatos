import contactCreateController from "../controllers/contacts/contactCreate.controller";
import contactListOneController from "../controllers/contacts/contactListOne.controller";
import contactUpdateOneController from "../controllers/contacts/contactUpdateOne.controller";
import contactDeleteController from "../controllers/contacts/contactDelete.controller";
import { authUser } from "../middlewares/authUser.middleware";
import { checkExistToken } from "../middlewares/checkTokenExists.middlewares";
import { verifyContactID } from "../middlewares/verifyContactID.middleware";
import { Router } from "express";

const routesContact = Router();

routesContact.post("", checkExistToken, authUser, contactCreateController);

routesContact.get(
  "/:id",
  checkExistToken,
  authUser,
  verifyContactID,
  contactListOneController
);

routesContact.patch(
  "/:id",
  checkExistToken,
  authUser,
  verifyContactID,
  contactUpdateOneController
);
routesContact.delete(
  "/:id",
  checkExistToken,
  authUser,
  verifyContactID,
  contactDeleteController
);

export default routesContact;
