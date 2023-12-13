import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';

export interface Answer {
  error: boolean;
  message: string;
  code?: number;
}

export const swagerAuthToken = {
  name: 'Authorization',
  description: 'Bearer Authorization token',
};
