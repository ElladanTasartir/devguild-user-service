import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { ormConfig } from './ormconfig';
import { mongodb } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    MongooseModule.forRoot(mongodb.uri),
    UserModule,
    ProjectModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
