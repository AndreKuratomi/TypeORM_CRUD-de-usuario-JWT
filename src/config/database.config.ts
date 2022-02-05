/* eslint-disable quotes */
import { ConnectionOptions } from "typeorm";
import User from "../entity";

const database: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "abkura",
  password: "1234",
  // database: "db",
  database: "typeorm_test",
  entities: [User],
  synchronize: true,
  logging: false,
};

export default database;
