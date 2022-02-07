/* eslint-disable quotes */
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";

class ListUserProfile {
  async execute() {
    const userRepository = getCustomRepository(UserRepository);

    const userProfile = await userRepository.findOne({
      email: "daniel3@kenzie.com",
    });
    if (!userProfile) {
      throw new Error("No user found!");
      // return response.status(404).json({ message: "No user found!" });
    }

    return userProfile;
  }
}

export default ListUserProfile;
