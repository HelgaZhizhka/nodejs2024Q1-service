import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private users: User[]) {}

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      setPassword: () => {},
      incrementVersion: () => {},
      setUpdatedAt: () => {},
    };

    this.users.push(newUser);
    return this.users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }
    
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateUserDto.oldPassword !== user.password) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    user.setPassword(updateUserDto.newPassword);
    user.incrementVersion();
    user.setUpdatedAt();

    return user;
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }

    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const user = this.users[index];
    this.users.splice(index, 1);

    return user;
  }
}
