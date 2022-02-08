/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import { tokenFirstApproach } from "../services/token.service";
import ErrorHandler from "../utils/errors";

export const isTokenValid = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  const tokenItself = tokenFirstApproach(token);

  jwt.verify(tokenItself, config.secret as string, (err: any) => {
    if (err) {
      // throw new ErrorHandler("Invalid token!", 401);
      response.status(401).json({ message: "Invalid token!" });
    }
  });

  return next();
};
