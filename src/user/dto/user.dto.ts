export class UserDto {
  firstName?: string;

  password?: string;

  secondName?: string;

  email?: string;

  hash?: string;

  refreshToken?: string;

  isActive?: boolean;
}


export class UserOBJ {
  id: number;

  name: string;

  email: string;

  refreshToken: string;

  isActive: boolean;

  constructor(id: number, name: string, email: string, isActive: boolean, refreshToken: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
    this.refreshToken = refreshToken;
  }
}
