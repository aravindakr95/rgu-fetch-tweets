import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TwitterController } from './twitter.controller';
import { TwitterAdapterService } from './twitter-adapter.service';

@Module({
  imports: [HttpModule],
  controllers: [TwitterController],
  providers: [TwitterAdapterService]
})
export class TwitterModule {}
