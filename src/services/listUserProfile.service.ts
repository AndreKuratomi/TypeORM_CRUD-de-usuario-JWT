/* eslint-disable quotes */
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import { foundScope, tokenFirstApproach } from "./token.service";

class ListUserProfile {
  async execute(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const token = tokenFirstApproach(request, response);

    // COMO FAZER PARA NÃO CHEGAR COMO VOID???
    // const foundEmail: any = foundScope(token as string);
    // console.log(foundEmail);

    const userProfile = await userRepository.findOne({
      email: "daniel3@kenzie.com",
    });
    if (!userProfile) {
      // throw new Error("No user found!");
      return response.status(404).json({ message: "No user found!" });
    }

    return userProfile;
  }
}

export default ListUserProfile;
