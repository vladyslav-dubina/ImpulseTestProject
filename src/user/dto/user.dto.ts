import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  firstName?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  secondName?: string;
  @ApiProperty()
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

export class DeleteRes {
  @ApiProperty()
  raw: [];
  @ApiProperty()
  affected: number;
}

export class UpdateRes {
  @ApiProperty()
  generatedMaps: [];
  @ApiProperty()
  raw: [];
  @ApiProperty()
  affected: number;
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
