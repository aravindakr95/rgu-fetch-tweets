import { Module } from '@nestjs/common';

import { WordCloudController } from './word-cloud.controller';
import { NlpModule } from '../nlp/nlp.module';
import { WordCloudService } from './word-cloud.service';

@Module({
  imports: [NlpModule],
  controllers: [WordCloudController],
  providers: [WordCloudService]
})
export class WorldCloudModule {}
