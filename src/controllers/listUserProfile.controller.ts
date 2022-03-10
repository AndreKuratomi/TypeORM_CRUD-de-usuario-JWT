import { Request, Response } from "express";

class ListUserProfileController {
  async handle(request: any, response: Response) {
    try {
      const userData = request.userProfile;

      const { password: passawordData, ...dataWithoutPassword } = userData;

      return response.json(dataWithoutPassword);
    } catch (error: any) {
      return response.status(error.statusCode).json({ message: error.message });
    }
  }
}
export default ListUserProfileController;
