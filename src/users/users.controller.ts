// users.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { MongoDBService } from 'src/function/mongodb.service';


@Controller('users')
export class UsersController {
  constructor(private userService: UsersService,private mongoDBService : MongoDBService) {}

  @Post('/')
  async postUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    console.log("ok")
    const res = await this.mongoDBService.create("demo",createUserDto);
    console.log(res)
    return res
  }
}
