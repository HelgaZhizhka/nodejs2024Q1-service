import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { inMemoryDbService } from '@/inMemoryDb/inMemoryDb.service';
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

    const id = uuidv4();

    const newUser: User = new UserEntity({
      id,
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.db.users.push(newUser);
    return newUser;
  }

  findAll(): UserEntity[] {
    return this.db.users;
  }

  findOne(id: string): UserEntity {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
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
    const user = this.findOne(id);
    const userIndex = this.db.users.indexOf(user);
    this.db.users.splice(userIndex, 1);
  }
}
