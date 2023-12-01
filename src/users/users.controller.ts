import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MongoDBService } from 'src/function/mongodb.service';


@Controller('users')
export class UsersController {
  constructor(private mongoDBService : MongoDBService) {}

  @Post('/')
  async postUser(@Body() createUserDto: any): Promise<string> {
    console.log("created")
    const res = await this.mongoDBService.create("users",createUserDto);
    console.log(res)
    return res
  }

  @Get('/')
  async getUser(@Query() queryDto: any) {
    try {
      const res = await this.mongoDBService.findAll("users", queryDto);
      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  


}
