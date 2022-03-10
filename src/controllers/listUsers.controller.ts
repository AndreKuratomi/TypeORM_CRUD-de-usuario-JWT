/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import { Request, Response } from "express";
import ListUsersService from "../services/listUsers.service";

class ListUsersController {
  async handle(request: Request, response: Response) {
    try {
      const listUsersService = new ListUsersService();

      const users = await listUsersService.execute();

      let nonSensitiveList = [];

      for (let count = 0; count < users.length; count++) {
        const { password: passawordData, ...dataWithoutPassword } =
          users[count];
        nonSensitiveList.push(dataWithoutPassword);
      }

      return response.json(nonSensitiveList);
    } catch (error: any) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default ListUsersController;
