import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  uuid!: string;

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
}
