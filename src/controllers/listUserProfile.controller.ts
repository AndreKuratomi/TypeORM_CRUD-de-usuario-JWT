import { Request, Response } from "express";
import ListUserProfile from "../services/listUserProfile.service";

class ListUserProfileController {
  async handle(request: Request, response: Response) {
    const listUserProfileService = new ListUserProfile();

    const userData = await listUserProfileService.execute(request, response);
    console.log(userData);
    return response.json(userData);
  }
}
export default ListUserProfileController;
