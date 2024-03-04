import { Module } from '@nestjs/common';

import { TrackController } from '@/track/track.controller';
import { TrackService } from '@/track/track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
