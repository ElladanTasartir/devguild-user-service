import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { TechnologyDTO } from './technology-dto';

export class InsertTechnologiesInUserDTO {
  @IsArray()
  @Type(() => TechnologyDTO)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  technologies: TechnologyDTO[];
}
