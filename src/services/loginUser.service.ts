/* eslint-disable quotes */
import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "../repository/user.repository";
import config from "../config/jwt.config";
import ErrorHandler from "../utils/errors";

interface IUserLogin {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: IUserLogin) {
    const userRepository = getCustomRepository(UserRepository);

    const doesUserExist = await userRepository.findOne({ email });

    if (doesUserExist === undefined) {
      throw new ErrorHandler("No user found!", 401);
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExist.password
    );

    if (!doesPasswordMatch) {
      throw new ErrorHandler("Given password mismatch!", 401);
    }

    const id = doesUserExist.id;

    const token: string = jwt.sign({ id }, config.secret as string, {
      expiresIn: config.expiresIn,
    });

    return token;
  }
}

export default LoginUserService;
