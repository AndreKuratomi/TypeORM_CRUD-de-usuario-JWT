/* eslint-disable quotes */
/* eslint-disable prefer-destructuring */
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";

class UpdateUserController {
  async handle(request: any, response: Response) {
    const { id } = request.params;
    const data = request.body;

    const userRepository = getCustomRepository(UserRepository);

    for (const elem in data) {
      console.log(elem);
      if (elem === "isAdmin") {
        throw new Error("'isAdmin' field cannot be updated!");
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
      throw new Error("Only admins may update non self-profiles!");
    }

    userProfile.updatedOn = new Date();

    const user = await userRepository.findOne({ id });

    return response.json(user);
  }
}

export default UpdateUserController;
