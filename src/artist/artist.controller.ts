import { Controller, Get } from '@nestjs/common';

import { ArtistService } from '@/artist/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll(): string[] {
    return this.artistService.findAll();
  }
}
