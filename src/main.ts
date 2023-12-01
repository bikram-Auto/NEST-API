import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstrap the NestJS application.
 * This file initializes the NestJS framework, creates an instance of the AppModule, and starts the server.
 */
async function bootstrap() {
  // Create a Nest application instance based on the AppModule
  const app = await NestFactory.create(AppModule);

  // Start the application by listening on a specified port (e.g., 3000)
  await app.listen(3000);

  // Log a message indicating that the server has started
  console.log('Server started...');
}

// Call the bootstrap function to start the application
bootstrap();
