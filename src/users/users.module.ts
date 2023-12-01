import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongoDBService } from 'src/function/mongodb.service';


@Module({
  controllers: [UsersController],
  providers: [MongoDBService],
})
export class UsersModule {

}

