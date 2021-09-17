import { User } from '../../user/entities/user.entity';
import { UsersComments } from '../entities/users-comments.entity';

type StrippedUser = Pick<User, 'avatar_url' | 'username'>;

export interface CommentsWithUsers extends UsersComments {
  user_comment: StrippedUser;
}
