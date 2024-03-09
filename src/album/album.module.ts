import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { inMemoryDbModule } from '@/inMemoryDb/inMemoryDb.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [inMemoryDbModule]
})
export class AlbumModule {}
