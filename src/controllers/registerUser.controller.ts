import { Request, Response } from "express";
import UserRegisterService from "../services/registerUser.service";

class RegisterUserController {
  async handle(request: Request, response: Response) {
    try {
      const { email, name, password, isAdmin } = request.body;

      const userRegisterService = new UserRegisterService();
      // ONLY ONE CAN BE ADMIN!
      const user = await userRegisterService.execute({
        name,
        email,
        password,
        isAdmin,
      });

      return response.json(user);
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default RegisterUserController;
