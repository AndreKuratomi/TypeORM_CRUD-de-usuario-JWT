/* eslint-disable quotes */
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import UserRepository from "../repository/user.repository";

interface ITokenProp {
  tokenItself: string;
}

class ListUserProfile {
  async execute({ tokenItself }: ITokenProp) {
    const userRepository = getCustomRepository(UserRepository);

    const token = tokenItself;
    jwt.verify(token, config.secret as string, async (err, decoded: any) => {
      const tokenId = decoded.id;
      const userProfile = await userRepository.findOne({ id: tokenId });
      if (!userProfile) {
        throw new Error("No user found!");
      }
      console.log(userProfile);

      request.userProfile = userProfile;
    });
  }
}

export default ListUserProfile;
