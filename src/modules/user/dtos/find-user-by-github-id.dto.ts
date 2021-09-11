import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class FindUserByGithubIdDTO {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  github_id: number;
}
