import { IsUUID } from 'class-validator';

export class InsertProjectMemberDTO {
  @IsUUID()
  user_id: string;
}
