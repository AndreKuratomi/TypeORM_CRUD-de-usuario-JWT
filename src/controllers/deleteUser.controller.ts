import { Request, Response } from "express";
import DeleteUserService from "../services/DeleteUser.service";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();

    const deletedUser = await deleteUserService.execute(id);

    return response.json(deletedUser);
  }
}

export default DeleteUserController;
