import { Module } from '@nestjs/common';

import { FavoriteController } from '@/favorite/favorite.controller';
import { FavoriteService } from '@/favorite/favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
