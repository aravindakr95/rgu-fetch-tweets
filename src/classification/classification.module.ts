import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ClassificationService } from './classification.service';
import { ClassificationController } from './classification.controller';
import {TextToConvertModule} from '../text-to-convert/text-to-convert.module';

@Module({
  imports: [HttpModule, TextToConvertModule],
  controllers: [ClassificationController],
  providers: [ClassificationService],
  exports: [ClassificationService]
})
export class ClassificationModule {}
