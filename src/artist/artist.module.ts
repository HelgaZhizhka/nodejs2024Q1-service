import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { inMemoryDbModule } from '@/inMemoryDb/inMemoryDb.module';
import { TrackService } from '@/track/track.service';
import { AlbumService } from '@/album/album.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, TrackService, AlbumService],
  imports: [inMemoryDbModule],
})
export class ArtistModule {}
