import {
  InternalServerErrorException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { schemaValidation } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: UserDto): Promise<any> {
    try {
      const validation = await schemaValidation(data, 'User');
      if (!validation.error) {
        const user = await this.userRepository.create(data as any);
        const res = await this.userRepository.save(user);
        return res;
      } else {
        throw new BadRequestException(validation.message);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    const res = await this.userRepository.find({
      select: ['id', 'firstName', 'email'],
    });
    return res;
  }

  async findByID(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: [
        'id',
        'firstName',
        'secondName',
        'email',
        'isActive',
        'refreshToken',
      ],
    });
    if (!user) {
      throw new InternalServerErrorException('Profile not found.');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  update(id: number, data: UserDto) {
    try {
      return this.userRepository.update({ id: id }, data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
