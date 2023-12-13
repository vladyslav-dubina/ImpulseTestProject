import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
}

export class TokenAnswer {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}
