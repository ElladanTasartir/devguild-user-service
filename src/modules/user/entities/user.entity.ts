import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Technology } from './user-technologies.entity';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Technology, (tech) => tech.user)
  technologies: Technology[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
