import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import { User } from '@/user/interface/user.interface';

export class UserEntity implements User {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    const { login, password, version, createdAt, updatedAt } = partial;
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
