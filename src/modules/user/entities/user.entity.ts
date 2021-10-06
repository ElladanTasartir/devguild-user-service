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
import { UserComments } from '../../project/entities/user-comments.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  avatar_url: string;

  @Column()
  github_id: number;

  @Column()
  bio: string;

  @Column()
  followers: number;

  @Column()
  following: number;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserComments, (usersComments) => usersComments.user)
  comments: UserComments[];

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
