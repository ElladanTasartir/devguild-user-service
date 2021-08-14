import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';

@Entity({ name: 'user_technologies' })
export class Technology {
  @PrimaryColumn()
  technology_id: number;

  @Exclude()
  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => User, (user) => user.technologies)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
