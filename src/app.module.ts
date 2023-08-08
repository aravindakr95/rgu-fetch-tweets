import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterModule } from './twitter/twitter.module';
import { NlpModule } from './nlp/nlp.module';
import { WorldCloudModule } from './world-cloud/world-cloud.module';
import {
  TextToConvertModule
} from './text-to-convert/text-to-convert.module';
import {ClassificationModule} from './classification/classification.module';

@Module({
  imports: [TwitterModule, NlpModule, WorldCloudModule, TextToConvertModule, ClassificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
