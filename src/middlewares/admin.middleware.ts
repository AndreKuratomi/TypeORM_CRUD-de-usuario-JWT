/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../config/jwt.config";
import UserRepository from "../repository/user.repository";

export const isUserAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const usersRepository = getCustomRepository(UserRepository);

  const isValidAdmin = await usersRepository.findOne({ isAdmin: true });

  // REPETITIVO
  const auth = request.headers.authorization;

  if (auth === undefined) {
    // throw new Error("Headers unabled!");
    return response.status(401).json({ message: "Headers unabled!" });
  }

  const token = auth.split(" ")[1];

  jwt.verify(token, config.secret as string, (err, decoded: any) => {
    if (isValidAdmin?.email !== decoded["email"]) {
      // throw new Error("This user is not an administrator!");
      return response
        .status(401)
        .json({ message: "This user is not an administrator!" });
    }
  });

  return next();
};
