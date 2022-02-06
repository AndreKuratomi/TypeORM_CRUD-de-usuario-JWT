/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from "express";

export const isTokenValid = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const auth = request.headers.authorization;

  if (auth === undefined) {
    // POR QUE AQUI NO MIDDLEWARE THROW NÂO FUNCIONA??
    // throw new Error("Headers unabled!");
    return response.status(401).json({ message: "Headers unabled!" });
  }

  const token = auth.split(" ")[1];

  if (token === undefined) {
    // throw new Error("No token used!");
    return response.status(401).json({ message: "No token used!" });
  }

  return next();
};
