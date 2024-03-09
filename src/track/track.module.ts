import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { inMemoryDbModule } from '@/inMemoryDb/inMemoryDb.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [inMemoryDbModule],
})
export class TrackModule {}
