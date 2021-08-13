import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './modules/user/user.module';
import { ormConfig } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), UserModule],
  controllers: [AppController],
})
export class AppModule {}
