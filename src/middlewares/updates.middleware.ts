/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import config from "../config/jwt.config";
import UserRepository from "../repository/user.repository";
import { tokenFirstApproach } from "../services/token.service";

// interface IRequest {
//     request:
// }

export const extractTokenId = (
  request: any,
  response: Response,
  next: NextFunction
) => {
    const userProfile = request.userProfile;
    const userRepository = getCustomRepository(UserRepository);

    console.log(userProfile)
    console.log(userProfile.isAdmin)

    // // COMO DEIXAR CLARO QUE QUEM É ADMIN PODE TUDO E QUEM NÃO PODE SÓ NO PRÓPRIO???
    // if (
    //     (userProfile.isAdmin === true && userProfile.id === id) ||
    //     (userProfile.isAdmin === true && userProfile.id !== id)
    //   ) {
    //     await userRepository.update(id, data);
    //     // console.log(userRepository);
    //   }
    //   if (userProfile.isAdmin === false && userProfile.id === id) {
    //     await userRepository.update(id, data);
    //     // console.log(userRepository);
    //   } else if (userProfile.isAdmin === false && userProfile.id !== id) {
    //     throw new Error("'isAdmin' field cannot be updated!");
    //   }
  
    //   const user = userRepository.findOne({ id });
  
    //   userProfile.updatedOn = new Date();
  
    //   return user;
    return next();
  );
};
