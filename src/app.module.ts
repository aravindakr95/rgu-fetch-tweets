import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterModule } from './twitter/twitter.module';
import { NlpModule } from './nlp/nlp.module';
import { WorldCloudModule } from './world-cloud/world-cloud.module';
import { TextToExcelModule } from './text-to-excel/text-to-excel.module';

@Module({
  imports: [TwitterModule, NlpModule, WorldCloudModule, TextToExcelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
