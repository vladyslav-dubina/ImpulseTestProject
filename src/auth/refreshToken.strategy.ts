import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserOBJ } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const user = await this.userService.findByID(payload.sub);
    if (!user || !user.refreshToken) {
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
