/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import dotenv from "dotenv";

dotenv.config();

export const config = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
