import { Module } from '@nestjs/common';

import { inMemoryDbModule } from '@/inMemoryDb/inMemoryDb.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService,],
  imports: [inMemoryDbModule],
})
export class UserModule {}
