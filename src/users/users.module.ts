import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersService}])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
