import { Global, Module } from '@nestjs/common';

import { inMemoryDbService } from './inMemoryDb.service';

@Global()
@Module({
  providers: [inMemoryDbService],
  exports: [inMemoryDbService],
})
export class inMemoryDbModule {}
