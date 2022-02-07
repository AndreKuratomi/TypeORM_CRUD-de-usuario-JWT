/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import UserRepository from "../repository/user.repository";
import { tokenFirstApproach } from "../services/token.service";

export const isUserAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  tokenFirstApproach(token);

  const usersRepository = getCustomRepository(UserRepository);

  const isValidAdmin = await usersRepository.find({ isAdmin: true });

  jwt.verify(token as string, config.secret as string, (err, decoded: any) => {
    for (let i = 0; i < isValidAdmin.length; i++) {
      if (isValidAdmin[i].id === decoded["id"]) {
        return "";
      }
    }

    throw new Error("This user is not an administrator!");
  });

  return next();
};
