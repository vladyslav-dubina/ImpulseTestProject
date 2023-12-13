import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('signIn')
    async signIn(@Body() signInDto: SignInDTO) {
        return await this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signUp')
    async create(@Body() userDtoData: UserDto) {
        return await this.authService.signUp(userDtoData);
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')
    logout(@Req() req: Request) {
        this.authService.logout(req.user.id);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: Request) {
      const userId = req.user.id;
      const refreshToken = req.user.refreshToken;
      return this.authService.refreshTokens(userId, refreshToken);
    }
}
