import { Request, Response } from "express";
import ListUserProfile from "../services/listUserProfile.service";

class ListUserProfileController {
  async handle(request: Request, response: Response) {
    const listUserProfileService = new ListUserProfile();

    const user = listUserProfileService.execute();

    return response.json(user);
  }
}
export default ListUserProfileController;
