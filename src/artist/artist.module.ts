import { Module } from '@nestjs/common';

import { inMemoryDbModule } from '../inMemoryDb/inMemoryDb.module';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, TrackService, AlbumService],
  imports: [inMemoryDbModule],
})
export class ArtistModule {}
