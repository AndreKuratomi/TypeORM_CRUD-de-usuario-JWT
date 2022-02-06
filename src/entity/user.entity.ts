/* eslint-disable indent */
/* eslint-disable quotes */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  readonly id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  isAdmin!: boolean;

  @Column()
  readonly createdOn!: Date;

  @Column()
  readonly updatedOn!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.createdOn) {
      this.createdOn = new Date();
    }
    if (!this.updatedOn) {
      this.updatedOn = new Date();
    }
  }
}
