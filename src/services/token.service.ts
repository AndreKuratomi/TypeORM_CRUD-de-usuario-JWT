/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */

export const tokenFirstApproach = (auth: string | undefined) => {
  if (auth === undefined) {
    throw new Error("Headers unabled!");
    // return response.status(401).json({ message: "Headers unabled!" });
  }

  const token = auth.split(" ")[1];

  return token;
};
