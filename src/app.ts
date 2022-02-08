/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable quotes */
import express, { Express } from "express";
import router from "./routes";
import { handleError } from "./middlewares/error.middleware";

const app: Express = express();

app.use(express.json());
app.use(router);
app.use(handleError);

export default app;
