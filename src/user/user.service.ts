import {
  InternalServerErrorException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { schemaValidation } from '../utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * The create function creates a user record in the database.
   * Receives data object of type UserDto as input.
   * Returns the user entry object.
   */
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

  /**
   * The findAll function finding all users.
   * Returns the array of user entry object.
   */
  async findAll() {
    const res = await this.userRepository.find({
      select: ['id', 'firstName', 'email'],
    });
    return res;
  }

  /**
   * The findByID function finding user by id.
   * Receives id variable as input.
   * Returns the user entry object.
   */
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

  /**
   * The findByEmail function finding user by email.
   * Receives email variable as input.
   * Returns the user entry object.
   */
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
    });
  }

  /**
   * The findByEmail function updating user by id.
   * Receives two variables id and data object of type UserDto as input
   * Returns the UpdateResult object.
   */
  async update(id: number, data: UserDto): Promise<UpdateResult> {
    try {
      return await this.userRepository.update({ id: id }, data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * The remove function deleting user by id.
   * Receives id variable as input
   * Returns the user entry object.
   */
  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
