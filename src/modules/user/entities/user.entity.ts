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
import { ProjectMembers } from '../../project/entities/project-members.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  avatar_url: string;

  @Column()
  github_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Technology, (tech) => tech.user)
  technologies: Technology[];

  @OneToMany(() => ProjectMembers, (project) => project.user)
  projects: ProjectMembers[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
