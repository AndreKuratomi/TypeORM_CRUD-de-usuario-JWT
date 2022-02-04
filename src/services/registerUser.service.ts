import UserRepository from "../repository/user.repository";
import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcrypt";

interface IUserRequest {
  //   id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  //   createdOn: Date;
  //   updatedOn: Date;
}

class UserRegisterService {
  async execute({ name, email, password, isAdmin }: IUserRequest) {
    if (!email || !name || !password) {
      throw new Error("Required field missing!");
    }

    const userRepository = getCustomRepository(UserRepository);

    const emailAlreadyExists = await userRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("Email already registered!");
    }

    const hashing = await bcrypt.hash(password, 10);

    const user = userRepository.create({ name, email, isAdmin });

    await userRepository.save(user);

    return user;
  }
}

export default UserRegisterService;
