import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongoDBService } from 'src/function/mongodb.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService,MongoDBService],
})
export class UsersModule {

}

