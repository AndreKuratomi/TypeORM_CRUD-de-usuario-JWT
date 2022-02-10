/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcrypt";

import User from "../entity/User";
import UserRepository from "../repository/user.repository";
import ErrorHandler from "../utils/errors";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

class UserRegisterService {
  // eslint-disable-next-line object-curly-newline
  async execute({ name, email, password, isAdmin }: IUserRequest) {
    const userRepository = getCustomRepository(UserRepository);
    // console.log(userRepository);

    const emailAlreadyExists = await userRepository.findOne({ email });
    console.log(emailAlreadyExists);

    if (emailAlreadyExists) {
      throw new ErrorHandler("Email already registered!", 403);
    }

    const hashing = await bcrypt.hash(password as string, 10);
    password = hashing;

    const user = userRepository.create(
      new User(name, email, password, isAdmin)
    );
    console.log(user);

    await userRepository.save(user);

    return user;
  }
}

export default UserRegisterService;
