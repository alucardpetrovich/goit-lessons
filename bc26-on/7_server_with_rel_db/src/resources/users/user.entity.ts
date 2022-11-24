import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id = "";

  @Column({ type: "varchar" })
  username = "";

  @Column({ type: "varchar", unique: true })
  email = "";

  @Column({ type: "varchar" })
  password = "";
}
