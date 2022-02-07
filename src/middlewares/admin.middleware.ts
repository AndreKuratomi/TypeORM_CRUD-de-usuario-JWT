/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../config/jwt.config";
import UserRepository from "../repository/user.repository";
import { tokenFirstApproach } from "../services/token.service";

export const isUserAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const usersRepository = getCustomRepository(UserRepository);

  const isValidAdmin = await usersRepository.findOne({ isAdmin: true });

  const token = tokenFirstApproach(request, response);

  jwt.verify(token as string, config.secret as string, (err, decoded: any) => {
    if (isValidAdmin?.email !== decoded["email"]) {
      // throw new Error("This user is not an administrator!");
      return response
        .status(401)
        .json({ message: "This user is not an administrator!" });
    }
  });

  return next();
};
