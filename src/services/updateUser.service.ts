import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";

interface IProps {
  id: string;
  data: {};
}

class UpdateUserService {
  async execute({ id, data }: IProps) {
    const userRepository = getCustomRepository(UserRepository);

    for (elem in data) {
      if (elem === isAdmin) {
        throw new Error("'isAdmin' field cannot be updated!");
      }
    }

    jwt.verify(token, config.secret, (err, decoded)) {
        if (err) {
            throw new Error("Invalid token!")
        }
    
        const userProfile = userRepository.find((user) => user.uuid === decoded.uuid)
        if (!userProfile) {
            throw new Error("No user found!")
        }
    }

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
