import { Module } from '@nestjs/common';

import { AlbumController } from '@/album/album.controller';
import { AlbumService } from '@/album/album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
