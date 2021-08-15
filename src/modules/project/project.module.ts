import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMembers } from './entities/project-members.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMembers])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
