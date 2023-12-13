import {
  InternalServerErrorException,
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { config as dotenvConfig } from 'dotenv';
import { UserDto } from '../user/dto/user.dto';
import { TokenAnswer } from './dto/signIn.dto';
dotenvConfig({ path: '.env' });

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * The hashData function creates a hash from incoming data.
   */
  hashData(data: string) {
    return argon2.hash(data);
  }

  /**
   * The updateRefreshToken function update refresh token by creating a hash from the token,
   *  and updating the entry in the database using the update function belonging to userService.
   * @param userId is user db id
   * @param refreshToken is user refresh token.
   */
  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  /**
   * The getTokens function create refresh and access tokens using this.jwtService.signAsync.
   * @param userId is user db id
   * @param username is user name.
   * Returns an object consisting of refresh and access tokens
   */
  async getTokens(userId: number, username: string): Promise<TokenAnswer> {
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

  /**
   * The signUp function checks whether the user exists, then creates account and tokens and updates the token in the database record.
   * Receives createUserDto object as input, which will be used to create account and tokens.
   * @param createUserDto is object of UserDto type
   * Returns an object consisting of refresh and access tokens
   */
  async signUp(createUserDto: UserDto): Promise<TokenAnswer> {
    const exist = await this.userService.findByEmail(createUserDto.email);
    if (exist) throw new BadRequestException('Email already exists!');
    createUserDto.hash = await this.hashData(createUserDto.password);
    const user = await this.userService.create(createUserDto);
    const tokens = await this.getTokens(user.id, user.firstName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  /**
   * The signIp function checks whether the user login and password is correct, then creates tokens and updates the token in the database record.
   * Receives two variables email and pass as input.
   * @param email is user email
   * @param pass is inputed password
   * Returns an object consisting of refresh and access tokens
   */
  async signIn(email: string, pass: string): Promise<TokenAnswer> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) throw new BadRequestException('Incorect login or email.');
      const passwordMatches = await argon2.verify(user.hash, pass);
      if (!passwordMatches) throw new BadRequestException('Incorect pass.');
      const tokens = await this.getTokens(user.id, user.firstName);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * The logout function removes a refresh token from a record in the database.
   * @param userId is user db id
   */
  async logout(userId: number) {
    return this.userService.update(userId, { refreshToken: null });
  }

  /**
   * The refreshTokens function updates the record token in the database. If there is no user or user token is empty, it returns access denial.
   * @param userId is user db id
   * @param refreshToken is user refresh token.
   */
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
