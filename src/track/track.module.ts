import { Module } from '@nestjs/common';

import { inMemoryDbModule } from '../inMemoryDb/inMemoryDb.module';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [inMemoryDbModule],
})
export class TrackModule {}
