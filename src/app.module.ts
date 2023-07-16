import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterModule } from './twitter/twitter.module';
import { NlpModule } from './nlp/nlp.module';

@Module({
  imports: [TwitterModule, NlpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
