import { User } from '../../user/entities/user.entity';
import { UserComments } from '../entities/user-comments.entity';

type StrippedUser = Pick<User, 'avatar_url' | 'username'>;

export interface CommentsWithUsers extends UserComments {
  user_comment: StrippedUser;
}
