import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";

class ListUsersService {
  async execute() {
    const usersRepository = getCustomRepository(UserRepository);

    const allUsers = usersRepository.find();

    return allUsers;
  }
}

export default ListUsersService;
