import { Exclude } from 'class-transformer';

import { User } from '@/user//interface/user.interface';

export class UserEntity implements User {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    const { id, login, password, version, createdAt, updatedAt } = partial;
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
