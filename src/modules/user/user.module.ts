import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from './entities/user-technologies.entity';
import { User } from './entities/user.entity';
import { TechnologiesController } from './technologies.controller';
import { TechnologiesService } from './technologies.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Technology])],
  controllers: [UserController, TechnologiesController],
  providers: [UserService, TechnologiesService],
  exports: [UserService],
})
export class UserModule {}
