import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";

export const isUserAdmin = (uuid) => {
  const usersRepository = getCustomRepository(UserRepository);

  const adminCandidate = usersRepository.findOne({ uuid });

  if (!adminCandidate) {
    throw new Error("No user found!");
  } else if (adminCandidate.isAdmin === true) {
    return true;
  }
  return false;
};
