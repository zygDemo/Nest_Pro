import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() //自增
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;
}
