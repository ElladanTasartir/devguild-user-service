import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rabbitmq } from 'src/config';
import { FetchModule } from '../fetch/fetch.module';
import { Technology } from './entities/user-technologies.entity';
import { User } from './entities/user.entity';
import { TechnologiesController } from './technologies.controller';
import { TechnologiesService } from './technologies.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TECHNOLOGIES_PROCESSOR',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitmq.connectionString],
          queue: rabbitmq.technologiesProcessorQueue,
          noAck: true,
        },
      },
    ]),
    TypeOrmModule.forFeature([User, Technology]),
    FetchModule,
  ],
  controllers: [UserController, TechnologiesController],
  providers: [UserService, TechnologiesService],
  exports: [UserService],
})
export class UserModule {}
