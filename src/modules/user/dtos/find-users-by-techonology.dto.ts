import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class FindUsersByTechnologyParamDTO {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  id: number;
}
