import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ unique: true })
  email: string = "";

  @Column()
  username: string = "";

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
