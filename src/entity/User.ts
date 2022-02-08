import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  createdOn!: Date;

  @UpdateDateColumn()
  updatedOn!: Date;

  constructor(name: string, email: string, password: string, isAdmin: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
