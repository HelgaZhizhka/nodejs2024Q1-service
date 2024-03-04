import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll(): string[] {
    return ['user1', 'user2', 'user3', 'user4'];
  }
}
