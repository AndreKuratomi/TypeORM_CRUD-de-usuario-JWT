/* eslint-disable quotes */
import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcrypt";

import User from "../entity";
import UserRepository from "../repository/user.repository";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

class UserRegisterService {
  async execute({ name, email, password, isAdmin }: IUserRequest) {
    if (!email || !name || !password || !isAdmin) {
      throw new Error("Required field missing!");
    }

    const userRepository = getCustomRepository(UserRepository);

    const emailAlreadyExists = await userRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("Email already registered!");
    }

    const adminAlreadyExists = await userRepository.findOne({ isAdmin });

    if (adminAlreadyExists) {
      throw new Error(
        "Admin already registered! Only one user can be Administrator!"
      );
    }

    const hashing = await bcrypt.hash(password, 10);

    password = hashing;

    const user = userRepository.create(
      new User(name, email, password, isAdmin)
    );

    await userRepository.save(user);

    return user;
  }
}

export default UserRegisterService;
