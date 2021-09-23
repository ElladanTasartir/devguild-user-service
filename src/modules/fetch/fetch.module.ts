import { Module } from '@nestjs/common';
import { FetchProjectService } from './fetch-project.service';

@Module({
  providers: [FetchProjectService],
  exports: [FetchProjectService],
})
export class FetchModule {}
