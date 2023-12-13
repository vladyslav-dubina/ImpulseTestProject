import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Default app path
   */
  @ApiTags('main')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
