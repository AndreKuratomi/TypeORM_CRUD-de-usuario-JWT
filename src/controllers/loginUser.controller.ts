import { Request, Response } from "express";
import LoginUserService from "../services/loginUser.service";

class LoginUserController {
  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const loginUserService = new LoginUserService();

      const user = loginUserService.execute({ email, password });

      return response.json(user);
    } catch (error: any) {
      return response.status(400).json({ message: error.message });
    }
  }
}
export default LoginUserController;
