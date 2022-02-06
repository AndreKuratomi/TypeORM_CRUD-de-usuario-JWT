import { Request, Response } from "express";
import LoginUserService from "../services/loginUser.service";

class LoginUserController {
  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const loginUserService = new LoginUserService();
      const user = await loginUserService.execute({ email, password });
      console.log(user);

      return response.json({ token: user });
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }
  }
}
export default LoginUserController;
