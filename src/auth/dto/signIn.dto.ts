import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email?: string;
}

export class TokenAnswer {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
