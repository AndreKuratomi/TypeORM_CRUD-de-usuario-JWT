/* eslint-disable quotes */
/* eslint-disable prefer-destructuring */
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import ErrorHandler from "../utils/errors";

class UpdateUserController {
  async handle(request: any, response: Response) {
    const { id } = request.params;
    const data = request.body;

    const userRepository = getCustomRepository(UserRepository);

    for (const elem in data) {
      if (elem === "isAdmin") {
        // throw new ErrorHandler("'isAdmin' field cannot be updated!", 401);
        return response
          .status(401)
          .json({ message: "'isAdmin' field cannot be updated!" });
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
      // throw new ErrorHandler("Only admins may update non self-profiles!", 401);
      return response
        .status(401)
        .json({ message: "Non admins must update only its own profiles!" });
    }

    userProfile.updatedOn = new Date();

    const user = await userRepository.findOne({ id });

    return response.json(user);
  }
}

export default UpdateUserController;
