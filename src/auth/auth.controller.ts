import { Body, Controller, Post, HttpCode, HttpStatus, HttpException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDTO, @Res() response) {
        const res = await this.authService.signIn(signInDto.email, signInDto.password)
        if (res.code == 500) {
            throw new HttpException(res.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (res.error && !res.code) {
            throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
        } 
        return response.header('auth-token', res.message).json({ error: false, message: 'Logged in!' });
    }
}
