/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import jwt from "jsonwebtoken";

import config from "../config/jwt.config";

export const tokenFirstApproach = (auth: string | undefined) => {
  if (auth === undefined) {
    throw new Error("Headers unabled!");
    // return response.status(401).json({ message: "Headers unabled!" });
  }

  const token = auth.split(" ")[1];

  return token;
};

// FEITO APENAS PARA (TENTAR) FUGIR DO PROBLEMA DO ESCOPO!
export const foundScope = (token: string) => {
  jwt.verify(token as string, config.secret as string, (err, decoded: any) => {
    const email: string = decoded["email"];
    console.log(email);
    return email;
  });
};
