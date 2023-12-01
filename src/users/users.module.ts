import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongoDBService } from 'src/function/mongodb.service';

/**
 * NestJS module for managing user-related functionality.
 * This module encapsulates the users controller and MongoDB service.
 */
@Module({
  // Controllers that handle HTTP requests related to users
  controllers: [UsersController],

  // Providers (services, repositories, etc.) used within the module
  providers: [MongoDBService],
})
export class UsersModule {}
