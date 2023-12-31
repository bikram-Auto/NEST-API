import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstrap the NestJS application.
 * This file initializes the NestJS framework, creates an instance of the AppModule, and starts the server.
 */
async function bootstrap() {
  // Create a Nest application instance based on the AppModule
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('create user')
    .setDescription('Create User, get and update user by name and date')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application by listening on a specified port (e.g., 3000)
  await app.listen(3001);

  // Log a message indicating that the server has started
  console.log('Server started...');
}

// Call the bootstrap function to start the application
bootstrap();
