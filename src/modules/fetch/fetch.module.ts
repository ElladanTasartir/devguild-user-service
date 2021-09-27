import { Module } from '@nestjs/common';
import { FetchProjectService } from './fetch-project.service';
import { FetchTechService } from './fetch-tech.service';

@Module({
  providers: [FetchProjectService, FetchTechService],
  exports: [FetchProjectService, FetchTechService],
})
export class FetchModule {}
