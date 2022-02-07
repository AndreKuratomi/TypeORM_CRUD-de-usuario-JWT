/* eslint-disable quotes */
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import { foundScope, tokenFirstApproach } from "./token.service";

interface IEmail {
  email: string;
}

class ListUserProfile {
  async execute(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const token = tokenFirstApproach(request, response);

    // PORQUE ESTÁ CHEGANDO COMO VOID???
    const foundEmail: any = foundScope(token as string);
    console.log(foundEmail);

    // const userProfile = await userRepository.findOne({ email: foundEmail });
    // if (!userProfile) {
    //   // throw new Error("No user found!");
    //   return response.status(404).json({ message: "No user found!" });
    // }
    // console.log(userProfile);
    // return userProfile;
  }
}

export default ListUserProfile;
