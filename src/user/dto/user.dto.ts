export class UserDto {
  firstName: string;

  password?: string;

  secondName: string;

  email: string;

  salt: string;

  hash: string;

  isActive: boolean;
}
