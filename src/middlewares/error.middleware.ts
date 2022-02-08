/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from "express";

import ErrorHandler from "../utils/errors";

export const handleError = (
  error: ErrorHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof ErrorHandler) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};