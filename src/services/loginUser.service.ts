import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "../repository/user.repository";
import config from "../config/jwt.config";

interface IUserLogin {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: IUserLogin) {
    const userRepository = getCustomRepository(UserRepository);

    const doesUserExist = await userRepository.findOne({ email });
    if (!doesUserExist) {
      throw new Error("No user found!");
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExist.password
    );

    const token = jwt.sign({ email: email }, config.secret, {
      expiresIn: config.expiresIn,
    });

    if (!doesPasswordMatch) {
      throw new Error("Given password mismatch!");
    }

    const userToken = userRepository.create({ token });

    await userRepository.save(userToken);

    return userToken;
  }
}

export default LoginUserService;
