import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  DeleteRes,
  UpdateRes,
  UserDto,
  UserForAllRerurn,
} from './dto/user.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'Users successfully finded.',
    type: [UserForAllRerurn],
  })
  @ApiResponse({ status: 500, description: 'ServerError' })
  @Get()
  @UseGuards(AccessTokenGuard)
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'User profile successfully finded.',
    type: [UserDto],
  })
  @ApiResponse({ status: 500, description: 'Profile not found' })
  @Get('/profile')
  @UseGuards(AccessTokenGuard)
  async findUser(@Req() request: Request) {
    return await this.userService.findByID(+request.user.id);
  }

  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'User profile successfully finded by id.',
    type: [UserDto],
  })
  @ApiResponse({ status: 500, description: 'Profile not found' })
  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findByID(+id);
  }

  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'User profile successfully updated by id.',
    type: [UpdateRes],
  })
  @ApiResponse({ status: 500, description: 'Profile not found' })
  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() userDtoData: UserDto) {
    return this.userService.update(+id, userDtoData);
  }

  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'User profile successfully deleted by id.',
    type: [DeleteRes],
  })
  @ApiResponse({ status: 500, description: 'Profile not found' })
  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
