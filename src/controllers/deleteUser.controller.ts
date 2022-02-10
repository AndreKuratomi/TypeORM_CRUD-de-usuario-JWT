/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import ErrorHandler from "../utils/errors";

class DeleteUserController {
  async handle(request: any, response: Response) {
    try {
      const { id } = request.params;

      const userRepository = getCustomRepository(UserRepository);

      const userProfile = request.userProfile;

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
          "Non admins must delete only its own profiles!",
          401
        );
      }

      return response.json({ message: "User deleted with success" });
    } catch (error: any) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default DeleteUserController;
