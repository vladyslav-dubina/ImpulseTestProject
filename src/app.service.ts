import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * The getHello function return string for page
   */
  getHello(): string {
    return 'Hello World!';
  }
}
