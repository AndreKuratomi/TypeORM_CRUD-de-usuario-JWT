/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable prefer-destructuring */
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import User from "../entity/User";

import UserRepository from "../repository/user.repository";
import ErrorHandler from "../utils/errors";

class UpdateUserController {
  async handle(request: any, response: Response) {
    try {
      const { id } = request.params;
      const data = request.body;

      const userRepository = getCustomRepository(UserRepository);

      for (const elem in data) {
        if (elem === "isAdmin") {
          throw new ErrorHandler("'isAdmin' field cannot be updated!", 401);
        }
      }

      const userProfile = request.userProfile;

      if (
        (userProfile.isAdmin === true && userProfile.id === id) ||
        (userProfile.isAdmin === true && userProfile.id !== id)
      ) {
        await userRepository.update(id, data);
      }

      if (userProfile.isAdmin === false && userProfile.id === id) {
        await userRepository.update(id, data);
      } else if (userProfile.isAdmin === false && userProfile.id !== id) {
        throw new ErrorHandler(
          "Only admins may update non self-profiles!",
          401
        );
      }

      userProfile.updatedOn = new Date();

      const user = await userRepository.findOne({ id });

      const { password: passawordData, ...dataWithoutPassword } = user as User;

      return response.json(dataWithoutPassword);
    } catch (error: any) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default UpdateUserController;
