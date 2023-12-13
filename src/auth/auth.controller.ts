import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, TokenAnswer } from './dto/signIn.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { swagerAuthToken } from 'src/utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * User authorization path
   */
  @ApiTags('auth')
  @ApiResponse({
    status: 200,
    description: 'User successfully loggined.',
    type: TokenAnswer,
  })
  @ApiResponse({
    status: 400,
    description: 'Incorect login or email / Incorect pass',
  })
  @ApiResponse({ status: 500, description: 'ServerError' })
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDTO) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  /**
   * User registration path
   */
  @ApiTags('auth')
  @ApiResponse({ status: 200, description: 'User successfully registered.' })
  @ApiResponse({
    status: 400,
    description: 'Email already exists! / Validation Error',
  })
  @ApiResponse({ status: 500, description: 'ServerError' })
  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  async create(@Body() userDtoData: UserDto) {
    return await this.authService.signUp(userDtoData);
  }

  /**
   * User logout path
   */
  @ApiTags('auth')
  @ApiResponse({ status: 200, description: 'User successfully logouted.' })
  @ApiHeader(swagerAuthToken)
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user.id);
  }

  /**
   * User refresh token path
   */
  @ApiTags('auth')
  @ApiResponse({ status: 200, description: 'Token successfully updated.' })
  @ApiResponse({ status: 403, description: 'Access Denied.' })
  @ApiHeader(swagerAuthToken)
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user.id;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
