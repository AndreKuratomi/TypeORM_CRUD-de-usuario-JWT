import { Request, Response } from "express";
import ListUsersService from "../services/listUsers.service";

class ListUsersController {
  async handle(request: Request, response: Response) {
    try {
      const listUsersService = new ListUsersService();

      const users = await listUsersService.execute();

      return response.json(users);
    } catch (error: any) {
      return response.status(401).json({ message: error.message });
    }
  }
}

export default ListUsersController;
