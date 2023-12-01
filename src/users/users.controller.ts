import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MongoDBService } from 'src/function/mongodb.service';

@Controller('users')
export class UsersController {
  constructor(private mongoDBService: MongoDBService) {}

  /**
   * Handle POST request to create a new user.
   * @param createUserDto - Data for creating a new user.
   * @returns A promise that resolves with the result of the user creation operation.
   */
  @Post('/')
  async postUser(@Body() createUserDto: any): Promise<string> {
    try {
      console.log("User created");
      const res = await this.mongoDBService.create("users", createUserDto);
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    } 
  }

  /**
   * Handle GET request to retrieve user data.
   * @param queryDto - Query parameters for filtering user data.
   * @returns A promise that resolves with an array of user documents matching the query.
   */
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
