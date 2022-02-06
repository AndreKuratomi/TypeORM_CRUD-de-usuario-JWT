/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable quotes */
import { EntityRepository, Repository } from "typeorm";
import User from "../entity";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;
