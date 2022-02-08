/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import ErrorHandler from "../utils/errors";

class DeleteUserController {
  async handle(request: any, response: Response) {
    const { id } = request.params;

    const userRepository = getCustomRepository(UserRepository);

    const userProfile = request.userProfile;
    console.log(userProfile);
    if (
      (userProfile.isAdmin === true && userProfile.id === id) ||
      (userProfile.isAdmin === true && userProfile.id !== id)
    ) {
      await userRepository.delete(id);
    }
    if (userProfile.isAdmin === false && userProfile.id === id) {
      await userRepository.delete(id);
    } else if (userProfile.isAdmin === false && userProfile.id !== id) {
      throw new ErrorHandler(
        "Non admins must delete only its own profile!",
        401
      );
    }

    return response.json({ message: "User deleted with success" });
  }
}

export default DeleteUserController;
