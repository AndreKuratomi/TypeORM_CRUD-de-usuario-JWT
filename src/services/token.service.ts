/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */

import ErrorHandler from "../utils/errors";

export const tokenFirstApproach = (auth: string | undefined) => {
  if (auth === undefined) {
    throw new ErrorHandler("Headers unabled!", 401);
  }

  const token = auth.split(" ")[1];

  return token;
};
