/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable quotes */
import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
// import database from "./config/database.config";

const PORT = 3000;

createConnection()
// database
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log("Server running!");
    });
  })
  .catch((error) => console.log(error));
