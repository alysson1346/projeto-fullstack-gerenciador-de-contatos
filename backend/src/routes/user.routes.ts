import userCreateController from "../controllers/users/userCreate.controller";
import userListController from "../controllers/users/userList.controller";
import userListOneController from "../controllers/users/userListOne.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import deleteUserController from "../controllers/users/userDelete.controller";
import updateUserController from "../controllers/users/userUpdate.controller";

import { authUser } from "../middlewares/authUser.middleware";
import { verifyEmailExist } from "../middlewares/verifyEmail.middleware";
import { checkExistToken } from "../middlewares/checkTokenExists.middlewares";
import { Router } from "express";

const routesUsers = Router();

routesUsers.post("", verifyEmailExist, userCreateController);
routesUsers.post("/login", userLoginController);
routesUsers.get("", userListController);
routesUsers.get("/me", checkExistToken, authUser, userListOneController);
routesUsers.delete("/me", checkExistToken, authUser, deleteUserController);
routesUsers.patch("/me", checkExistToken, authUser, updateUserController);

export default routesUsers;
