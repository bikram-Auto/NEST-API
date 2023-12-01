import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Handle GET request to retrieve a greeting message.
   * @returns A string representing a greeting message.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
