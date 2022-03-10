/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
/* eslint-disable object-curly-newline */
import { Request, Response } from "express";

import UserRegisterService from "../services/registerUser.service";

class RegisterUserController {
  async handle(request: Request, response: Response) {
    try {
      const { email, name, password, isAdmin } = request.body;

      const userRegisterService = new UserRegisterService();

      const user = await userRegisterService.execute({
        name,
        email,
        password,
        isAdmin,
      });

      const { password: passawordData, ...dataWithoutPassword } = user;

      return response.json(dataWithoutPassword);
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default RegisterUserController;
