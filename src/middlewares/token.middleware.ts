/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";
import { tokenFirstApproach } from "../services/token.service";

export const isTokenValid = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = tokenFirstApproach(request, response);

  jwt.verify(token as string, config.secret as string, (err: any) => {
    if (err) {
      // throw new Error("Invalid token!");
      return response.status(401).json({ message: "Invalid token!" });
    }
  });

  return next();
};
