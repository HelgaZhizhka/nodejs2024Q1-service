import { Module } from '@nestjs/common';

import { ArtistController } from '@/artist/artist.controller';
import { ArtistService } from '@/artist/artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
