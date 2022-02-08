/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import config from "../config/jwt.config";
import UserRepository from "../repository/user.repository";
import { tokenFirstApproach } from "../services/token.service";
import ErrorHandler from "../utils/errors";

// interface IRequest {
//     request:
// }

export const extractTokenId = (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  const tokenItself = tokenFirstApproach(token);
  const userRepository = getCustomRepository(UserRepository);

  jwt.verify(
    tokenItself,
    config.secret as string,
    async (err, decoded: any) => {
      const tokenId = decoded.id;
      const userProfile = await userRepository.findOne({ id: tokenId });
      if (!userProfile) {
        // throw new ErrorHandler("No user found!", 404);
        throw new Error("No user found!");
      }

      request.userProfile = userProfile;

      return next();
    }
  );
};
