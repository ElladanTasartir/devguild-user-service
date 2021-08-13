import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_technologies' })
export class Technology {
  @PrimaryColumn()
  id: number;

  @Column()
  technology_id: number;

  @ManyToOne(() => User, (user) => user.technologies)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
