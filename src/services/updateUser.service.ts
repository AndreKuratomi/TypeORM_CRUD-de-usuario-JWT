/* eslint-disable no-restricted-syntax */
/* eslint-disable quotes */
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";

interface IProps {
  id: string;
  data: {};
}

class UpdateUserService {
  async execute({ id, data }: IProps) {
    const userRepository = getCustomRepository(UserRepository);

    for (const elem in data) {
      if (elem === "isAdmin") {
        throw new Error("'isAdmin' field cannot be updated!");
      }
    }

    const { userProfile } = request.userProfile;

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
      throw new Error("'isAdmin' field cannot be updated!");
    }

    const user = await userRepository.findOne({ id });

    user.updatedOn = new Date();

    return user;
  }
}

export default UpdateUserService;
