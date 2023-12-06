// users.controller.ts
import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Put, 
  Query 
} from '@nestjs/common';
import { MongoDBService } from 'src/function/mongodb.service';

/**
 * Controller responsible for handling user-related operations.
 */
@Controller('users')
export class UsersController {
  /**
   * Constructs the UsersController instance.
   * @param mongoDBService - An instance of the MongoDBService to handle user-related database operations.
   */
  constructor(
    private mongoDBService: MongoDBService,
  ) {}

  /**
   * Handles POST request to create a new user.
   * @param body - Data for creating a new user.
   * @returns A promise that resolves with the result of the user creation operation.
   * @throws If an error occurs during the user creation process.
   */
  @Post('/')
  async postUser(@Body() body: any): Promise<string> {
    try {
      console.log("User created"); // Log a message indicating that a user is being created
      const res = await this.mongoDBService.create("users", body); // Create a new user in the database
      console.log(res); // Log the result of the user creation operation
      return res; // Return the result of the user creation operation
    } catch (error) {
      throw error; // Rethrow any errors that occur during the user creation process
    } 
  }

  /**
   * Handles GET request to retrieve user data based on the provided name.
   * @param name - The name parameter used to filter user data.
   * @returns A promise that resolves with an array of user documents matching the query.
   * @throws If an error occurs during the user retrieval process or if the name is not provided.
   */
  @Get('/') // Example: http://localhost:3000/users/?name={name}
  async getUser(@Query('name') name: string) {
    try {
      // Check if the name parameter is provided
      if (!name) {
        throw new Error('Name parameter is required for user retrieval.');
      }
      const query = { name }; // Construct the query object
      const users = await this.mongoDBService.findAll('users', query);
      if (users.length === 0) {
        return {
          statusCode: 500,
          message: "Name not found",
        };
      } 
      console.log(users);
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Handles GET request to retrieve user data based on the provided user_id.
   * @param user_id - The user_id parameter used to filter user data.
   * @returns A promise that resolves with an array of user documents matching the query.
   * @throws If an error occurs during the user retrieval process or if the user_id is not provided.
   */
  @Get('/id') // Example: http://localhost:3000/users/id?id={number}
  async getUserById(@Query('id') user_id: string) {
    try {
      // Check if the id parameter is provided
      if (user_id === undefined || user_id === null) {
        throw new Error('id parameter is required for user retrieval.');
      }
      console.log('Searching for user with id:', user_id);
      const userId = parseInt(user_id);
      const query = { user_id: userId }; // Construct the query object
      const users = await this.mongoDBService.findAll('users', query);
      if (!users || users.length === 0) {
        return {
          statusCode: 404,
          message: "User not found with the specified ID",
        };
      }
      console.log('User found:', users);
      return users;
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
      throw error;
    }
  }

  /**
   * Handles PATCH request to update the date of a user with the specified user_id.
   * @param userId - The user_id parameter from the URL path.
   * @param updateDto - Data for updating the user date.
   * @returns A promise that resolves with a message indicating the success of the update operation.
   * @throws If an error occurs during the update process.
   */
  @Patch(':user_id')// Example: http://localhost:3000/users/{user_id}
  async updateUserDate(@Param('user_id') userId: string, @Body() updateDto: { date: string }) {
    try {
      const query = { user_id: parseInt(userId) };
      const updateDate = { date: updateDto.date };

      const updateResult = await this.mongoDBService.update("users", query, updateDate);

      console.log(updateResult);
      return { message: "User date updated successfully " };
    } catch (error) {
      throw error;
    } 
  }

  /**
   * Handles PUT request to update user data based on the provided user_id.
   * @param userId - The user_id parameter from the URL path.
   * @param updateUserDto - Data for updating the user.
   * @returns A promise that resolves with a message indicating the success of the update operation.
   * @throws If an error occurs during the update process.
   */
  @Put(':user_id')// Example: http://localhost:3000/users/{user_id}
  async updateUserById(@Param('user_id') userId: string, @Body() updateUserDto: any) {
    try {
      const query = { user_id: parseInt(userId) };

      const updateResult = await this.mongoDBService.update("users", query, updateUserDto);

      console.log(updateResult);
      return { message: "User updated successfully" };
    } catch (error) {
      throw error;
    } 
  }
}
