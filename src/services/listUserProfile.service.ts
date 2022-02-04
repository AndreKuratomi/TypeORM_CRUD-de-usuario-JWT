import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import config from "../config/jwt.config";

class ListUserProfile {
  // usar o middleware isTokenValid
  async execute() {
    const userRepository = getCustomRepository(UserRepository);

    jwt.verify(token, config.secret, (err, decoded)) {
        if (err) {
            throw new Error("Invalid token!")
        }
    
        const userProfile = userRepository.find((user) => user.uuid === decoded.uuid)
        if (!userProfile) {
            throw new Error("No user found!")
        }

        return userProfile;
    }
  }
}

export default ListUserProfile;
