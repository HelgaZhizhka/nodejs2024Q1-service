import { Module } from '@nestjs/common';

import { inMemoryDbModule } from '../inMemoryDb/inMemoryDb.module';
import { TrackService } from '../track/track.service';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
  imports: [inMemoryDbModule],
})
export class AlbumModule {}
