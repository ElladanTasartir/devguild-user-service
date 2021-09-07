import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'project_members' })
export class ProjectMembers {
  @Exclude()
  @PrimaryColumn()
  project_id: string;

  @Exclude()
  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => User, (user) => user.technologies)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
