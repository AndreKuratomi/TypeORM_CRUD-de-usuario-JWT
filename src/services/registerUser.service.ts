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
    // if (!name || !email || !password || !isAdmin) {
    //   throw new Error("Required field missing!");
    // }

    const userRepository = getCustomRepository(UserRepository);

    const emailAlreadyExists = await userRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("Email already registered!");
    }

    // COMO FAZER COM QUE HAJA APENAS 1 ADMIN: TRUE?;

    // const adminAlreadyExists = await userRepository.findOne({
    //   where: { isAdmin: true },
    // });

    // console.log(adminAlreadyExists);

    // if (adminAlreadyExists) {
    //   throw new Error(
    //     "Admin already registered! Only one user can be Administrator!"
    //   );
    // }

    const hashing = await bcrypt.hash(password, 10);
    password = hashing;

    // COMO OMITIR A SENHA RECÉM CRIPTOGRAFADA SE ANTES PRECISO DELA NA INTERFACE PARA CRIPTOGRAFAR? COMO OMITÍ-LA DEPOIS DE CRIPTOGRAFÁ-LA?;

    const user = userRepository.create(
      new User(name, email, password, isAdmin)
    );

    await userRepository.save(user);

    return user;
  }
}

export default UserRegisterService;
