import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { inMemoryDbModule } from '@/inMemoryDb/inMemoryDb.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [inMemoryDbModule],
})
export class ArtistModule {}
