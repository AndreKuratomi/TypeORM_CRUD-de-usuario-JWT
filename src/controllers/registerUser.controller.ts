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
      // console.log(userRegisterService);

      const user = await userRegisterService.execute({
        name,
        email,
        password,
        isAdmin,
      });
      console.log(user);

      // const publicUser = user;
      // "The operand of a 'delete' operator must be optional"
      // delete publicUser.password;
      // console.log(publicUser);

      return response.json(user);
    } catch (error: any) {
      console.log("qwer");
      return response.status(400).json({ message: error.message });
    }
  }
}

export default RegisterUserController;
