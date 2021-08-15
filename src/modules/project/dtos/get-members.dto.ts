import { IsUUID } from 'class-validator';

export class GetMembersDTO {
  @IsUUID()
  id: string;
}
