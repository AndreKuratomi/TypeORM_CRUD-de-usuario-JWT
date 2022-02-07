import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import config from "../config/jwt.config";
import { foundScope, tokenFirstApproach } from "./token.service";

class DeleteUserService {
  async execute(id: string) {
    // await userRepository.delete(id);
  }
}

export default DeleteUserService;
