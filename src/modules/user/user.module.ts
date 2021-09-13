import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from './entities/user-technologies.entity';
import { User } from './entities/user.entity';
import { UsersCommentsSchema } from './schemas/user-comments.schema';
import { TechnologiesController } from './technologies.controller';
import { TechnologiesService } from './technologies.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Technology]),
    MongooseModule.forFeature([
      { name: 'UsersComments', schema: UsersCommentsSchema },
    ]),
  ],
  controllers: [UserController, TechnologiesController],
  providers: [UserService, TechnologiesService],
})
export class UserModule {}
