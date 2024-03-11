import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Entities } from '../utils/enums';
import { inMemoryDbService } from '../inMemoryDb/inMemoryDb.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: inMemoryDbService) {}

  create(createUserDto: CreateUserDto): UserEntity {
    const { login } = createUserDto;

    const isUserExists = this.db.users.some((user) => user.login === login);

    if (isUserExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser: User = new UserEntity({
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.db.addEntity(Entities.USERS, newUser);
    return newUser;
  }

  findAll() {
    return this.db.getAllEntities(Entities.USERS);
  }

  findOne(id: string) {
    return this.db.findEntityById(id, Entities.USERS) as User;
  }

  update(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const user = this.findOne(id);
    const { oldPassword, newPassword } = updateUserDto;

    if (user.password !== oldPassword) {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version++;
    return user;
  }

  remove(id: string) {
    this.db.removeEntity(id, Entities.USERS);
  }
}
