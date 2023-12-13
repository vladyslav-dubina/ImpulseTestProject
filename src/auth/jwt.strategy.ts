import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { config as dotenvConfig } from 'dotenv';
import { UserOBJ } from 'src/user/dto/user.dto';
dotenvConfig({ path: '.env' });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }

  async validate(payload: any): Promise<UserOBJ> {
    const user = await this.userService.findByID(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    const name = user.firstName + ' ' + user.secondName;
    const authUser = new UserOBJ(
      user.id,
      name,
      user.email,
      user.isActive,
      user.refreshToken,
      user.role.split(','),
    );
    return authUser;
  }
}
