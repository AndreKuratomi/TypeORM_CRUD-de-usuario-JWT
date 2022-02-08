/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import UserRepository from "../repository/user.repository";
import { tokenFirstApproach } from "../services/token.service";
import ErrorHandler from "../utils/errors";

export const isUserAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  const tokenItself = tokenFirstApproach(token);

  const usersRepository = getCustomRepository(UserRepository);

  const isValidAdmin = await usersRepository.find({ isAdmin: true });

  jwt.verify(tokenItself, config.secret as string, (err, decoded: any) => {
    for (let i = 0; i < isValidAdmin.length; i++) {
      if (isValidAdmin[i].id === decoded["id"]) {
        return "";
      }
    }

    // throw new ErrorHandler("This user is not an administrator!", 401);
    response
      .status(401)
      .json({ message: "This user is not an administrator!" });
  });

  return next();
};
