import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";

interface IProps {
  id: string;
  data: {};
}

class UpdateUserService {
  //   usar middleware isTokenValid
  async execute({ id, data }: IProps) {
    const userRepository = getCustomRepository(UserRepository);

    for (elem in data) {
      if (elem === isAdmin) {
        throw new Error("'isAdmin' field cannot be updated!");
      }
    }

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
        await userRepository.update(id, data);
    } else if (userProfile.id === id) {
        await userRepository.update(id, data);
    }

    const user = userRepository.findOne({ id });

    user.updatedOn = new Date();

    return user;
  }
}

export default UpdateUserService;
