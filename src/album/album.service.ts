import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  findAll(): string[] {
    return ['user1', 'user2', 'user3', 'user4'];
  }
}
