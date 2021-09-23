import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FetchModule } from '../fetch/fetch.module';
import { UserModule } from '../user/user.module';
import { ProjectMembers } from './entities/project-members.entity';
import { UserComments } from './entities/user-comments.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectMembers, UserComments]),
    UserModule,
    FetchModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
