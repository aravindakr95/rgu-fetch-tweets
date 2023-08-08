import { Module } from '@nestjs/common';

import { WordCloudController } from './word-cloud.controller';
import { NlpModule } from '../nlp/nlp.module';
import { WordCloudService } from './word-cloud.service';
import { ClassificationModule } from '../classification/classification.module';

@Module({
  imports: [NlpModule, ClassificationModule],
  controllers: [WordCloudController],
  providers: [WordCloudService],
  exports: [WordCloudService]
})
export class WorldCloudModule {}
