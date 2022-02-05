import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";

class ListUsersService {
  // usar os middlewares isTokenValid e isUserAdmin
  async execute() {
    const usersRepository = getCustomRepository(UserRepository);

    const allUsers = usersRepository.find();

    return allUsers;
  }
}

export default ListUsersService;
