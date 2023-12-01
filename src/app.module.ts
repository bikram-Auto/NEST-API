import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDBService } from './function/mongodb.service';
import { UsersModule } from './users/users.module';

/**
 * NestJS module representing the root module of the application.
 * This module imports other modules, declares controllers, and provides services for the application.
 */
@Module({
  // Import other modules to be used in this module
  imports: [UsersModule],

  // Controllers that handle HTTP requests in the application
  controllers: [AppController],

  // Providers (services, repositories, etc.) used within the module
  providers: [AppService, MongoDBService],
})
export class AppModule {}
