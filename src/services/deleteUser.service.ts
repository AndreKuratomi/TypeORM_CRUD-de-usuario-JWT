import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import UserRepository from "../repository/user.repository";
import config from "../config/jwt.config";

class DeleteUserService {
  //   usar middleware isTokenValid
  async execute(id: string) {
    const userRepository = getCustomRepository(UserRepository);

        // pegar o token, abrí-lo e ver se pelo id ele é administrador. else, comparar o id do token com o id dado
        jwt.verify(token, config.secret, (err, decoded)) {
            if (err) {
                throw new Error("Invalid token!")
            }
        
            const userProfile = userRepository.find((user) => user.uuid === decoded.uuid)
            if (!userProfile) {
                throw new Error("No user found!")
            }
    
            // return userProfile;
        }
        // isto acima deve ser um service 
    
        if (userProfile.isAdmin === true) {
            await userRepository.delete(id);
        } else if (userProfile.id === id) {
            await userRepository.delete(id);
        }

    // await userRepository.delete(id);

    return "User deleted with success";
  }
}

export default DeleteUserService
