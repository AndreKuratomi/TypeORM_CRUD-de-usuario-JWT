/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import { Request, Response } from "express";

export const tokenFirstApproach = (request: Request, response: Response) => {
  const auth = request.headers.authorization;

  if (auth === undefined) {
    // throw new Error("Headers unabled!");
    return response.status(401).json({ message: "Headers unabled!" });
  }

  const token = auth.split(" ")[1];

  return token;
};
