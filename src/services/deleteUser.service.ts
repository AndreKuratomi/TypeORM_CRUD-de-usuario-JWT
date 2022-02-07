import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import config from "../config/jwt.config";
import { foundScope, tokenFirstApproach } from "./token.service";

class DeleteUserService {
  async execute(id: string) {
    const userRepository = getCustomRepository(UserRepository);

    // const foundEmail: any = foundScope(token as string);
    // console.log(foundEmail);

    const userProfile = await userRepository.findOne({
      email: "andre1@kenzie.com",
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
      await userRepository.delete(id);
      // console.log(userRepository);
    }
    if (userProfile.isAdmin === false && userProfile.id === id) {
      await userRepository.delete(id);
      // console.log(userRepository);
    } else if (userProfile.isAdmin === false && userProfile.id !== id) {
      return "Non admins must delete only its own profile!";
      // throw new Error("Non admins must delete only its own profile!");
    }

    // await userRepository.delete(id);

    return { mensagem: "User deleted with success" };
  }
}

export default DeleteUserService;
