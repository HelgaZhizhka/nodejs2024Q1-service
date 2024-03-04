import { Controller, Get } from '@nestjs/common';

import { AlbumService } from '@/album/album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll(): string[] {
    return this.albumService.findAll();
  }
}
