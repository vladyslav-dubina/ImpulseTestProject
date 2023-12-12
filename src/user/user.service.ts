import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { schemaValidation } from '../utils';
import { Answer } from '../utils';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: UserDto): Promise<Answer> {
    try {
      const validation = await schemaValidation(data, 'User');
      if (!validation.error) {
        const exist = await this.userRepository.findOneBy({
          email: data.email,
        });
        if (exist) return { error: true, message: 'Email already exists!' };
        data.salt = crypto.randomBytes(16).toString('hex');
        data.hash = crypto
          .pbkdf2Sync(data.password, data.salt, 1000, 64, 'sha512')
          .toString('hex');
        const user = await this.userRepository.create(data as any);
        await this.userRepository.save(user);
      } else {
        return { error: true, message: validation.message };
      }
    } catch (error) {
      console.log(error);
      return { error: true, message: 'Server error' };
    }
  }

  async findAll() {
    const res = await this.userRepository.find({
      select: ['id', 'firstName', 'email'],
    });
    return res;
  }

  async findByID(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  update(id: number, data: UserDto) {
    return this.userRepository.update({ id: id }, data);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
