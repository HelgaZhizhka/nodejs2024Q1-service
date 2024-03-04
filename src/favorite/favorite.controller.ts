import { Controller, Get } from '@nestjs/common';

import { FavoriteService } from '@/favorite/favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  findAll(): string[] {
    return this.favoriteService.findAll();
  }
}
