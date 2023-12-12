import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDtoData: UserDto) {
    console.log(userDtoData);
    return await this.userService.create(userDtoData);
  }

  @Get()
  @UseGuards(AuthGuard())
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findByID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userDtoData: UserDto) {
    return this.userService.update(+id, userDtoData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
