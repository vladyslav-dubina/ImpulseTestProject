import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  firstName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  secondName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  hash?: string;
  refreshToken?: string;
  isActive?: boolean;
}

export class UserForAllRerurn {
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  secondName?: string;
  @ApiProperty()
  email?: string;
}

export class UserOBJ {
  id: number;

  name: string;

  email: string;

  refreshToken: string;

  isActive: boolean;

  constructor(
    id: number,
    name: string,
    email: string,
    isActive: boolean,
    refreshToken: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
    this.refreshToken = refreshToken;
  }
}
