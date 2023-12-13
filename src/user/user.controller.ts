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
import { UserDto, UserForAllRerurn } from './dto/user.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Path for getting all users. Only for authorized requests
   */
  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'Users successfully finded.',
    type: [UserForAllRerurn],
  })
  @ApiResponse({ status: 500, description: 'ServerError' })
  @ApiResponse({
    status: 403,
    description: `The user's role does not match the required role`,
  })
  @Get()
  /**
   * Example for RoleGuard, AccessTokenGuard, and RefreshTokenGuard. If you logout, then using RefreshToken will not connect
   */
  @Roles(Role.GUEST)
  @UseGuards(RefreshTokenGuard, RoleGuard)
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * Path for getting user profile. Only for authorized requests
   */
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

  /**
   * Path for getting user profile by id. Only for authorized requests
   */
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

  /**
   * Path for updating user profile by id. Only for authorized requests
   */
  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'User profile successfully updated by id.',
    type: [UpdateResult],
  })
  @ApiResponse({ status: 500, description: 'Profile not found' })
  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  async update(@Param('id') id: string, @Body() userDtoData: UserDto) {
    return await this.userService.update(+id, userDtoData);
  }

  /**
   * Path for deleting user profile by id. Only for authorized requests
   */
  @ApiTags('user')
  @ApiResponse({
    status: 200,
    description: 'User profile successfully deleted by id.',
    type: [DeleteResult],
  })
  @ApiResponse({ status: 500, description: 'Profile not found' })
  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
