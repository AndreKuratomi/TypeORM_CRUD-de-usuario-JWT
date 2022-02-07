/* eslint-disable no-restricted-syntax */
/* eslint-disable quotes */
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import { foundScope, tokenFirstApproach } from "./token.service";

interface IProps {
  id: string;
  data: {};
}

class UpdateUserService {
  // SE NO EXECUTE NÃO CABE COLOCAR REQ E RES COMO FAZER ALÉM DE REESCREVER O SERVICE DO TOKEN?
  async execute({ id, data }: IProps, request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    for (const elem in data) {
      if (elem === "isAdmin") {
        return "'isAdmin' field cannot be updated!";
        // throw new Error("'isAdmin' field cannot be updated!");
        // return response
        //   .status(401)
        //   .json({ message: "'isAdmin' field cannot be updated!" });
      }
    }

    const token = tokenFirstApproach(request, response);

    // const foundEmail: any = foundScope(token as string);
    // console.log(foundEmail);

    const userProfile = await userRepository.findOne({
      email: "daniel3@kenzie.com",
    });
    if (!userProfile) {
      throw new Error("No user found!");
    }

    console.log(userProfile.isAdmin);
    // COMO DEIXAR CLARO QUE QUEM É ADMIN PODE TUDO E QUEM NÃO PODE SÓ NO PRÓPRIO???
    if (
      (userProfile.isAdmin === true && userProfile.id === id) ||
      (userProfile.isAdmin === true && userProfile.id !== id)
    ) {
      await userRepository.update(id, data);
      // console.log(userRepository);
    }
    if (userProfile.isAdmin === false && userProfile.id === id) {
      await userRepository.update(id, data);
      // console.log(userRepository);
    } else if (userProfile.isAdmin === false && userProfile.id !== id) {
      return "Non admins must update only its own profile!";
      // throw new Error("'isAdmin' field cannot be updated!");
    }

    const user = userRepository.findOne({ id });

    userProfile.updatedOn = new Date();

    return user;
    // return userProfile;
  }
}

export default UpdateUserService;
