import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export default class Users {
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
  createdOn!: Date;

  @Column()
  updatedOn!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
