import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/profile')
  @UseGuards(AccessTokenGuard)
  async findUser(@Req() request: Request) {
    return await this.userService.findByID(+request.user.id);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findByID(+id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() userDtoData: UserDto) {
    return this.userService.update(+id, userDtoData);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
