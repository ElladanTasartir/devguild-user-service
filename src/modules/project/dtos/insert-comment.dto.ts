import { IsString, IsUUID, MinLength } from 'class-validator';

export class InsertCommentDTO {
  @IsUUID()
  user_id: string;

  @IsString()
  @MinLength(1)
  comment: string;
}
