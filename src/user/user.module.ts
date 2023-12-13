import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AccessContorlService } from 'src/access-contorl-service/access-contorl-service.service';
const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [passportModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, AccessContorlService],
  exports: [UserService],
})
export class UserModule {}
