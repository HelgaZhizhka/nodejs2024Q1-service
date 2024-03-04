import { Controller, Get } from '@nestjs/common';

import { TrackService } from '@/track/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll(): string[] {
    return this.trackService.findAll();
  }
}
