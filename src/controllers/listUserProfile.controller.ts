import { Request, Response } from "express";

class ListUserProfileController {
  async handle(request: any, response: Response) {
    const userData = request.userProfile;

    return response.json(userData);
  }
}
export default ListUserProfileController;
