import { Request, Response } from "express";
import UpdateUserService from "../services/updateUser.service";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;

    const updateUserService = new UpdateUserService();

    const updatedUser = await updateUserService.execute(
      { id, data },
      request,
      response
    );

    return response.json(updatedUser);
  }
}

export default UpdateUserController;
