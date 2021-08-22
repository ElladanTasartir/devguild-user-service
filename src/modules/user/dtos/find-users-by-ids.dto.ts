import { Transform } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class FindUsersByIdsDTO {
  @Transform(({ value }) => value.split(','))
  @IsUUID('4', { each: true })
  ids: string[];
}
