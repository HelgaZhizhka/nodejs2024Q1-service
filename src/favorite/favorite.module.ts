import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { inMemoryDbModule } from '@/inMemoryDb/inMemoryDb.module';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [inMemoryDbModule],
})
export class FavoriteModule {}
