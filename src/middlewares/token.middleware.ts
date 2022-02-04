import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

// import isUserAdmin from "./admin.middleware";
import UserRepository from "../repository/user.repository";

export const isTokenValid = (req: Request, res: Response, next: any) => {
  //   colocar num service?
  const userRepository = getCustomRepository(UserRepository);

  if (req.headers.authorization === undefined) {
    throw new Error("Headers unabled!");
  }

  const token = req.headers.authorization.split(" ")[1];

  if (token === undefined) {
    throw new Error("No token used!");
  }

  //   return token;
  //

  return next();
};
