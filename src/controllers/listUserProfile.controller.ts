import { Request, Response } from "express";
import ListUserProfile from "../services/listUserProfile.service";

class ListUserProfileController {
  async handle(request: any, response: Response) {
    // const listUserProfileService = new ListUserProfile();

    const userData = request.userProfile;
    console.log(userData);
    return response.json(userData);
  }
}
export default ListUserProfileController;
