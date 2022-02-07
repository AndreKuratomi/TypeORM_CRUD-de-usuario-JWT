/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import { Router } from "express";

import RegisterUserController from "./controllers/registerUser.controller";
import LoginUserController from "./controllers/loginUser.controller";
import ListUsersController from "./controllers/listUsers.controller";
import ListUserProfileController from "./controllers/listUserProfile.controller";
// import UpdateUserController from "./controllers/updateUser.controller";
// import DeleteUserController from "./controllers/deleteUser.controller";

import { isTokenValid } from "./middlewares/token.middleware";
import { isUserAdmin } from "./middlewares/admin.middleware";

const router = Router();

const registerUserController = new RegisterUserController();
const loginUserController = new LoginUserController();
const listUsersController = new ListUsersController();
const listUserProfileController = new ListUserProfileController();
// const updateUserController = new UpdateUserController();
// const deleteUserController = new DeleteUserController();

router.post("/users", registerUserController.handle);
router.post("/login", loginUserController.handle);
router.get("/users", isTokenValid, isUserAdmin, listUsersController.handle);
router.get("/users/profile", isTokenValid, listUserProfileController.handle);
// router.patch("/users/:uuid", isTokenValid, isUserAdmin, updateUserController.handle);
// router.delete("/users/:uuid", isTokenValid, deleteUserController.handle);

export default router;
