import { getDataSource } from "../../shared/db_connector";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";

export function getUsersRepository(): Repository<UserEntity> {
  return new Repository(UserEntity, getDataSource().manager);
}
