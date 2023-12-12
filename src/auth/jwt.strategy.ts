import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET, // Replace with your own secret key
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findByID(payload.sub);
    if (!user) {
        console.log('tata')
      throw new UnauthorizedException();
    }
    return user;
  }
}