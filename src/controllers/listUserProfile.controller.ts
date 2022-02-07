import { Request, Response } from "express";
import ListUserProfile from "../services/listUserProfile.service";
import { tokenFirstApproach } from "../services/token.service";

class ListUserProfileController {
  async handle(request: Request, response: Response) {
    const token = request.headers.authorization;
    const tokenItself = tokenFirstApproach(token);

    const listUserProfileService = new ListUserProfile();
    const userData = await listUserProfileService.execute({ tokenItself });
    console.log(userData);
    return response.json(userData);
  }
}
export default ListUserProfileController;
