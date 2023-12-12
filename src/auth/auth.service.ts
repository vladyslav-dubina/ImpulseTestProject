import { Injectable } from '@nestjs/common';
import { Answer } from '../utils';
import * as crypto from 'crypto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async signIn(email: string, pass: string): Promise<Answer> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) return { error: true, message: 'Incorect login or email.' };

      const hash = crypto
        .pbkdf2Sync(pass, user.salt, 1000, 64, 'sha512')
        .toString('hex');
      if (hash !== user.hash) return { error: true, message: 'Incorect pass' };

      //Create and assign token
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);
      const token = this.jwtService.sign(
        {
          id: user.id
        }
      );

      return { error: false, message: token };
    } catch (error) {
      console.log(error);
      return { error: true, message: 'Server error', code: 500 };
    }
  }
}
