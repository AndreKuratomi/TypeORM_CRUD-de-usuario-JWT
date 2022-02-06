/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";

export const isUserAdmin = async (id: string) => {
  const usersRepository = getCustomRepository(UserRepository);

  const adminCandidate = await usersRepository.findOne({ id });

  if (!adminCandidate) {
    throw new Error("No user found!");
  } else if (adminCandidate.isAdmin === true) {
    return true;
  }
  return false;
};
