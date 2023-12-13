import {
  InternalServerErrorException,
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { config as dotenvConfig } from 'dotenv';
import { UserDto } from 'src/user/dto/user.dto';
dotenvConfig({ path: '.env' });

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: UserDto): Promise<any> {
    const exist = await this.userService.findByEmail(createUserDto.email);
    console.log(exist);
    if (exist) throw new BadRequestException('Email already exists!');
    console.log('tata');
    createUserDto.hash = await this.hashData(createUserDto.password);
    const user = await this.userService.create(createUserDto);
    const tokens = await this.getTokens(user.id, user.firstName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(email: string, pass: string): Promise<{}> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) throw new BadRequestException('Incorect login or email.');
      const passwordMatches = await argon2.verify(user.hash, pass);
      if (!passwordMatches) throw new BadRequestException('Incorect pass.');
      const tokens = await this.getTokens(user.id, user.firstName);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async logout(userId: number) {
    return this.userService.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.TOKEN_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.TOKEN_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findByID(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.firstName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
