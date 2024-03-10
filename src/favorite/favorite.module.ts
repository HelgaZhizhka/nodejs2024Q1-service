import { Module } from '@nestjs/common';

import { inMemoryDbModule } from '@/inMemoryDb/inMemoryDb.module';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [inMemoryDbModule],
})
export class FavoriteModule {}
