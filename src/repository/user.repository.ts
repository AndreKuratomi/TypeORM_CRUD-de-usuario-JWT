import { EntityRepository, Repository } from "typeorm";
import User from "../entity/index";

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default { UserRepository };
