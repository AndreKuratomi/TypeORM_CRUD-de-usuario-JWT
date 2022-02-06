/* eslint-disable indent */
/* eslint-disable quotes */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
// import { v4 as uuid } from "uuid";

@Entity("users")
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

  @CreateDateColumn()
  updatedOn!: Date;

  constructor(
    name: string,
    email: string,
    //  password: string,
    isAdmin: boolean
  ) {
    this.name = name;
    this.email = email;
    // this.password = password;
    this.isAdmin = isAdmin;
  }
}
