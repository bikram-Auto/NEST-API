// users.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MongoDBService } from 'src/function/mongodb.service';
// import { AuthService } from 'src/function/auth.service'; // Import AuthService

@Controller('users')
export class UsersController {
  /**
   * Constructs the UsersController instance.
   * @param mongoDBService - An instance of the MongoDBService to handle user-related database operations.
   * @param authService - An instance of the AuthService to handle user authentication.
   */
  constructor(
    private mongoDBService: MongoDBService,
    // private authService: AuthService, // Inject AuthService
  ) {}

  /**
   * Handles POST request to create a new user.
   * @param createUserDto - Data for creating a new user.
   * @returns A promise that resolves with the result of the user creation operation.
   * @throws If an error occurs during the user creation process.
   */
  @Post('/')
  async postUser(@Body() createUserDto: any): Promise<string> {
    try {
      console.log("User created"); // Log a message indicating that a user is being created
      const res = await this.mongoDBService.create("users", createUserDto); // Create a new user in the database
      console.log(res); // Log the result of the user creation operation
      return res; // Return the result of the user creation operation
    } catch (error) {
      throw error; // Rethrow any errors that occur during the user creation process
    } 
  }

  /**
   * Handles GET request to retrieve user data.
   * @param queryDto - Query parameters for filtering user data.
   * @returns A promise that resolves with an array of user documents matching the query.
   * @throws If an error occurs during the user retrieval process.
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
      
      console.log(users);
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
